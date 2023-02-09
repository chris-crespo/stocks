import { Routes, Route, Navigate } from 'react-router-dom'
import MyWatchlists from './MyWatchlists'
import Watchlist from './Watchlist'

const WatchlistsRoutes = () => (
  <Routes>
    <Route path="/my" element={<MyWatchlists />} />
    <Route path="/:id" element={<Watchlist />} />
    <Route path="/*" element={<Navigate to="/watchlists/my" replace />} />
  </Routes>
)

export default WatchlistsRoutes
