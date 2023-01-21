import { authd } from "~/lib/wretch"

export const getTodaysCryptos = () => 
  authd(`/api/cryptos/today?symbols[]=BTC&symbols[]=ETH`)
    .get()
    .json()
