import api from "./axios";
export const login = (username: string, password: string) => {
  return api.post("/auth/login", { username, password });
};
export const register = (userData: {
  username: string;
  email: string;
  password: string;
}) => {
  return api.post("/users", userData);
};
