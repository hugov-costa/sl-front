import { User } from "./user";

export interface CheckAuthResponse {
  message: string;
  user: User;
}

export interface LoginResponse {
  message: string;
  user: User;
}

export interface LogoutResponse {
  message: string;
}
