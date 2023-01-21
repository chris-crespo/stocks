import wretch, { ConfiguredMiddleware } from 'wretch'
import { refresh, TJwt } from '~/features/auth'
import storage from '~/utils/storage'

const auth = (token: TJwt): ConfiguredMiddleware => {
  return next => async (url, opts) => {
    const response = await next(url, opts)
    if (response.status !== 401)
      return response

    const { data: { token: newToken }} = await refresh(token)
    storage.setToken(newToken)

    return await next(url, {
      ...opts,
      headers: {
        ...opts.headers,
        Authorization: `Bearer ${newToken}`
      }
    })
  }
}

export const authd = (url: string) => {
  const token = storage.getToken().unwrap()
  return wretch(url)
    .auth(`Bearer ${token}`)
    .middlewares([auth(token)])
}
