import axios from "axios";

const API = axios.create({
  baseURL: "http://192.168.18.63:5000",
  headers: {
    "Content-type": "application/json",
  },
});

// request interceptor for settting the two headers refresh & access tokens
API.interceptors.request.use(
  (config) => {
    console.log(config, " New Flag");
    console.log(localStorage.getItem("AdminAuth"));
    const token = JSON.parse(localStorage.getItem("AdminAuth"));
    console.log("I am here!");
    if (token && config.url !== "/RefreshToken" && config.url !== "/Login") {
      config.headers["Authorization"] = "Bearer " + token.access_token;
      console.log("I am here!!");
    } else if (config.url !== "/Login") {
      config.headers["Authorization"] = "Bearer " + token.refresh_token;
      console.log("I am here!!  2");
    }
    // Optional
    // config.headers["Content-Type"] = "application/json";
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

// response interceptor, when the backend throws error 403 for token expire it call the refresh token API and updates the token
API.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const originalRequest = error.config;
    console.log(error, " Original Request");
    if (error.response.status === 403) {
      return API.get("/RefreshToken").then((res) => {
        if (res.status === 200) {
          originalRequest._retry = true;
          let items = {
            access_token: res.data.access_token,
            refresh_token: res.data.refresh_token,
          };
          localStorage.setItem("AdminAuth", JSON.stringify(items));
          API.defaults.headers.common["Authorization"] =
            "Bearer " + res.data.access_token;
          originalRequest.headers["Authorization"] =
            "Bearer " + res.data.access_token;
          // call failed request due to token expire
          return axios(originalRequest);
        }
      });
    }
    Promise.reject(error);
  }
);

export default API;
