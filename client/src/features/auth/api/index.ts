import wretch from 'wretch'
import { 
  TLoginCredentials, 
  TRegisterCredentials, 
  TAuthSuccess, 
  TLoginFailure, 
  TLogoutSuccess, 
  TRegisterFailure, 
  TJwt,
  TMeSuccess,
  TLoadUserFailure
} from "../types"
import { 
  AuthSuccess,
  LoadUserFailure,
  LoginFailure,
  LogoutSuccess, 
  MeSuccess, 
  RefreshFailure, 
  RefreshSuccess,
  RegisterFailure, 
} from '../schemas'
import { authd } from '~/lib/wretch'
import { resultify } from '~/lib/result'
import { parseFailure } from '~/utils/api'

export const getUser = () => 
  resultify<TMeSuccess, TLoadUserFailure>(authd('/api/auth/me')
    .get()
    .error(422, parseFailure(LoadUserFailure))
    .json(MeSuccess.parse))

export const login = (credentials: TLoginCredentials) =>
  resultify<TAuthSuccess, TLoginFailure>(wretch('/api/auth/login')
    .post(credentials)
    .unauthorized(parseFailure(LoginFailure))
    .error(422, parseFailure(LoginFailure))
    .json(AuthSuccess.parse))

export const register = (user: TRegisterCredentials) =>
  resultify<TAuthSuccess, TRegisterFailure>(wretch('/api/auth/register')
    .post(user)
    .error(422, parseFailure(RegisterFailure))
    .json(AuthSuccess.parse))

export const refresh = (jwt: TJwt) =>
  wretch('/api/auth/refresh')
    .auth(`Bearer ${jwt}`)
    .post()
    .error(400, parseFailure(RefreshFailure))
    .json(RefreshSuccess.parse)

export const logout = () => 
  resultify<TLogoutSuccess, unknown>(wretch('/api/auth/logout')
    .post()
    .json(LogoutSuccess.parse))
