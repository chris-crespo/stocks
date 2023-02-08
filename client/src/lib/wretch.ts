import wretch, { ConfiguredMiddleware } from 'wretch'
import { refresh, TJwt } from '~/features/auth'
import { redirect } from '~/utils/browser'
import storage from '~/utils/storage'

const auth = (token: TJwt): ConfiguredMiddleware => {
  // @ts-ignore
  return next => async (url, opts) => {
    const response = await next(url, opts)
    if (response.status !== 401)
      return response

    const refreshResponse = await refresh(token)
    console.log({ refreshResponse })
    if (refreshResponse.ok) {
      const { token: newToken } = refreshResponse.val.data
      storage.setToken(newToken)
      return await next(url, {
        ...opts,
        headers: {
          ...opts.headers,
          Authorization: `Bearer ${newToken}`
        }
      })
    }

    storage.clearToken()
    redirect('/auth/login')
  }
}

export const authd = (url: string) => {
  const token = storage.getToken().unwrap()
  return wretch(url)
    .auth(`Bearer ${token}`)
    .middlewares([auth(token)])
}
