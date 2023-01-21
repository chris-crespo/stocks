import { Routes, Route } from "react-router-dom"
import Crypto from "./Crypto"
import Cryptos from "./Cryptos"
import Market from "./Market"
import Stock from "./Stock"
import Stocks from "./Stocks"

const MarketRoutes = () => (
  <Routes>
    <Route path="/cryptos" element={<Cryptos />} />
    <Route path="/cryptos/:symbol" element={<Crypto />} />
    <Route path="/stocks" element={<Stocks />} />
    <Route path="/stocks/:symbol" element={<Stock />} />
    <Route path="/*" element={<Market />} />
  </Routes>
)

export default MarketRoutes
