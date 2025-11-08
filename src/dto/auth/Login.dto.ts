import { AuthInfo } from "./AuthInfo.dto";

export interface LoginBody {
  email: string;
  password: string;
}

export interface LoginParams {}

export interface LoginQuery {}

export interface LoginResponse extends AuthInfo {}
