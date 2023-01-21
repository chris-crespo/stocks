import { HelmetProvider } from "react-helmet-async"
import { QueryClientProvider } from "react-query"
import { BrowserRouter as Router } from "react-router-dom"
import { AuthProvider } from "~/lib/auth"
import { queryClient } from "~/lib/react-query"

type Props = {
  children: React.ReactNode
}

const AppProvider = ({ children }: Props) => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>{children}</Router>
      </AuthProvider>
    </QueryClientProvider>
  </HelmetProvider>
)

export default AppProvider
