import AppProvider from './providers/app'
import AppRoutes from './routes'

const App: React.FC = () => (
  <AppProvider>
    <AppRoutes />
  </AppProvider>
)

export default App
