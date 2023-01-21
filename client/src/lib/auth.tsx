import { initReactQueryAuth } from "react-query-auth"
import { Result } from "ts-results"
import {
  getUser,
  login,
  register,
  logout,
  TUser,
  TLoginCredentials,
  TRegisterCredentials,
  TAuthSuccess,
  TLoginFailure,
  TRegisterFailure,
  TLoadUserFailure,
} from "~/features/auth"
import storage from "~/utils/storage"

function handleAuthResult<E>(result: Result<TAuthSuccess, E>) {
  return result.map(({ data }) => {
    const { token, user } = data
    storage.setToken(token)
    return user
  })
}

const loadUser = async () => {
  const failure = {
    status: 'error',
    message: 'Could not load user'
  } as TLoadUserFailure

  const result = storage.getToken().toResult(failure)
  if (result.ok) {
    const response = await getUser()
    return response.map(res => res.data.user)
  }

  return result
}

const loginFn = async (data: TLoginCredentials) => login(data).then(handleAuthResult)

const registerFn = (data: TRegisterCredentials) => register(data).then(handleAuthResult)

const logoutFn = () => logout().then(storage.clearToken)

const authConfig = {
  loadUser,
  loginFn,
  registerFn,
  logoutFn,
}

export const { AuthProvider, useAuth } = initReactQueryAuth<
  Result<TUser, TLoginFailure | TRegisterFailure | TLoadUserFailure>,
  unknown,
  TLoginCredentials,
  TRegisterCredentials
>(authConfig)
