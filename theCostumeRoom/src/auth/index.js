import {TokenService} from "@/auth/tokenService.js";

export const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  return !!token;
};

export const logout = () => {
  TokenService.removeToken();
}
