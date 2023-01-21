import { z } from "zod"
import { BaseSuccess, Messages, BaseFailure, Name } from "~/schemas"

export const Jwt = z.string().min(1).brand<'Jwt'>()

export const Email = z.string({ required_error: 'Email is required.' })
  .min(1, 'Email is required.')
  .email()
  .brand<'Email'>()

export const Password = z.string()
  .min(6, 'Password must be at least 6 characters.')
  .brand<'Password'>()

export const User = z.object({
  name: Name,
  email: Email
}).brand<'User'>()

export const RegisterCredentials = z.object({
  name: Name,
  email: Email,
  password: Password
}).brand<'RegisterCredentials'>()

export const LoginCredentials = z.object({
  email: Email,
  password: Password
}).brand<'LoginCredentials'>()

export const MeSuccess = BaseSuccess({ user: User }).brand<'MeSuccess'>()

export const AuthSuccess = BaseSuccess({
  token: Jwt,
  user: User
}).brand<'AuthSuccess'>()

export const LogoutSuccess = BaseSuccess().brand<'LogoutSuccess'>()

export const RefreshSuccess = BaseSuccess({ token: Jwt }).brand<'RefreshSuccess'>()

export const LoadUserFailure = BaseFailure()

export const LoginFailure = BaseFailure({
  email: Messages,
  password: Messages
})

export const RegisterFailure = BaseFailure({
  name: Messages,
  email: Messages,
  password: Messages,
})

export const RefreshFailure = BaseFailure()
