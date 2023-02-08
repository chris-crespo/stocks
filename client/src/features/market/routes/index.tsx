import { Routes, Route, Navigate } from "react-router-dom"
import Cryptos from "./Cryptos"
import Stocks from "./Stocks"

const MarketRoutes = () => (
  <Routes>
    <Route path="/cryptos" element={<Cryptos />} />
    <Route path="/stocks" element={<Stocks />} />
    <Route path="*" element={<Navigate to="/market/cryptos" replace />} />
  </Routes>
)

export default MarketRoutes
