import { Option, Some, None } from "ts-results"
import { storagePrefix } from "~/config"
import { TJwt, Jwt} from "~/features/auth"

const storageKey = `${storagePrefix}token`

const getToken = (): Option<TJwt> => {
  const token = JSON.parse(sessionStorage.getItem(storageKey) as string)
  const parsed = Jwt.nullable().parse(token)

  return parsed ? Some(parsed) : None
}

const setToken = (token: TJwt) => {
  sessionStorage.setItem(storageKey, JSON.stringify(token))
}

const clearToken = () => {
  sessionStorage.removeItem(storageKey)
}

export default {
  getToken,
  setToken,
  clearToken
}
