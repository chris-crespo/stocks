import { useRoutes } from "react-router-dom"
import { useAuth } from "~/lib/auth"
import protectedRoutes from "./protected"
import publicRoutes from "./public"

const AppRoutes = () => {
  const auth = useAuth()
  const routes = auth.user?.ok ? protectedRoutes : publicRoutes
  const element = useRoutes([...routes])

  return <>{element}</>
}

export default AppRoutes
