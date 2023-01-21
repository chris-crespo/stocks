import React from 'react'
import { Navigate } from 'react-router-dom'
import WatchlistsRoutes from '~/features/watchlists/routes'

const MarketRoutes = React.lazy(() => import('~/features/market'))

const protectedRoutes = [
  {
    path: '/market/*',
    element: <MarketRoutes />
  },
  {
    path: '/watchlists/*',
    element: <WatchlistsRoutes />
  },
  {
    path: '/*',
    element: <Navigate to="/market" replace />
  }
]

export default protectedRoutes
