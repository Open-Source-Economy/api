import { initContract } from "@ts-rest/core";
import {
  getStatusEndpoint,
  registerEndpoint,
  loginEndpoint,
  logoutEndpoint,
  checkEmailEndpoint,
  forgotPasswordEndpoint,
  resetPasswordEndpoint,
  getCompanyUserInviteInfoEndpoint,
  getRepositoryUserInviteInfoEndpoint,
} from "src/endpoints";

const c = initContract();

export const authContract = c.router({
  getStatus: getStatusEndpoint,
  register: registerEndpoint,
  login: loginEndpoint,
  logout: logoutEndpoint,
  checkEmail: checkEmailEndpoint,
  forgotPassword: forgotPasswordEndpoint,
  resetPassword: resetPasswordEndpoint,
  getCompanyUserInviteInfo: getCompanyUserInviteInfoEndpoint,
  getRepositoryUserInviteInfo: getRepositoryUserInviteInfoEndpoint,
});
