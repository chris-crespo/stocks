// import { useLatestQuotes } from "~/features/apca"
import { TAsset } from "~/features/assets"
import AssetCard from "./AssetCard"

type Props = {
  cryptos: TAsset[]
  stocks: TAsset[]
}

const WatchlistAssets = ({ cryptos, stocks }: Props) => {
  // const {
  //   cryptos: { data: cryptoData },
  //   stocks: { data: stockData }
  // } = useLatestQuotes({
  //   cryptos: cryptos.map(stock => stock.symbol),
  //   stocks: stocks.map(stock => stock.symbol),
  //   config: {
  //     refetchInterval: 10000
  //   }
  // })

  return (
    <div className="w-full max-w-sm">
      <div className="flex flex-col mb-8">
        <h2 className="mb-4">Cryptos</h2>
        {Object.entries(cryptoData?.quotes ?? []).map(([symbol, quote]) => (
          <AssetCard
            key={symbol}
            asset={cryptos.find(crypto => crypto.symbol === symbol.split('/')[0])!}
            quote={quote}
          />
        ))}
      </div>
      <div>
        <h2 className="mb-4">Stocks</h2>
        {Object.entries(stockData?.quotes ?? []).map(([symbol, quote]) => (
          <AssetCard
            key={symbol}
            asset={stocks.find(stock => stock.symbol === symbol)!}
            quote={quote}
          />
        )
        )}
      </div>
    </div >
  )
}

export default WatchlistAssets
