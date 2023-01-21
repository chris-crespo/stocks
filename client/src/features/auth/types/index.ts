import { z } from "zod"
import { 
  Jwt, 
  Email, 
  Password, 
  User, 
  LoginCredentials, 
  RegisterCredentials,
  AuthSuccess, 
  RefreshSuccess,
  LogoutSuccess,
  MeSuccess,
  RegisterFailure,
  LoginFailure,
  LoadUserFailure,
  RefreshFailure
} from "../schemas"

export type TJwt = z.infer<typeof Jwt>

export type TEmail = z.infer<typeof Email>

export type TPassword = z.infer<typeof Password>

export type TUser = z.infer<typeof User>

export type TLoginCredentials = z.infer<typeof LoginCredentials>

export type TRegisterCredentials = z.infer<typeof RegisterCredentials>

export type TMeSuccess = z.infer<typeof MeSuccess>

export type TAuthSuccess = z.infer<typeof AuthSuccess>

export type TRefreshSuccess = z.infer<typeof RefreshSuccess>

export type TLogoutSuccess = z.infer<typeof LogoutSuccess>

export type TLoadUserFailure = z.infer<typeof LoadUserFailure>

export type TLoginFailure = z.infer<typeof LoginFailure>

export type TRegisterFailure = z.infer<typeof RegisterFailure>

export type TRefreshFailure = z.infer<typeof RefreshFailure>
