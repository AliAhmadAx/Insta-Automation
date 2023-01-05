import http from "./axios";

const dashboard = (data) => {
  return http.post("/Dashboard", data);
};
const login = (data) => {
  return http.post("/Login", data);
};

const register = (data) => {
  return http.post("/Register", data);
};

const Logout = () => {
  return http.post("/Logout");
};

const ListPlans = (data) => {
  return http.get("/ListPlans", data);
};

const ForgotPassword = () => {
  return http.post("/ForgotPassword");
};

const TotalServices = {
  dashboard,
  login,
  register,
  Logout,
  ForgotPassword,
  ListPlans,
};

export default TotalServices;
