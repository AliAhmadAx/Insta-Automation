import axios from "axios";

const API = axios.create({
  baseURL: "http://45.32.136.182:6012",
});

// request interceptor
API.interceptors.request.use(
  (config) => {
    const token = JSON.parse(localStorage.getItem("AdminAuth"));
    if (token && config.url !== "/RefreshToken") {
      config.headers["Authorization"] = "Bearer " + token.access_token;
      console.log("Not For Refresh");
    } else {
      config.headers["Authorization"] = "Bearer " + token.refresh_token;
      console.log("For Refresh");
    }
    console.log(config);
    // config.headers['Content-Type'] = 'application/json';
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

// response interceptor
API.interceptors.response.use(
  (response) => {
    console.log(response, "The Error is in response");
    return response;
  },
  (error) => {
    // console.log(error.response.status, "The error is accurate");
    const originalRequest = error.config;
    // console.log(originalRequest, "Original Request");
    // console.log("This project requirest refresh token!! ", response);
    if (error.response.status === 403) {
      return API.get("/RefreshToken").then((res) => {
        console.log(error, "I am herereerere!");
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
          console.log("Bearer " + res.data.access_token, " APIIIIII22");
          console.log(originalRequest);
          return axios(originalRequest);
        }
      });
    }
    Promise.reject(error);
  }
);

export default API;
