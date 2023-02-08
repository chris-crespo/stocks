import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import useSelectedItems from "~/hooks/useSelectedItems"
import { TWatchlist } from "../types"
import AssetCard from "./AssetCard"
import AssetsChart from "./AssetsChart"
import WatchlistAssets from "./WatchlistAssets"

type Props = {
  watchlist: TWatchlist
}

const WatchlistContent = ({ watchlist }: Props) => {
  const assets = [...watchlist.cryptos, ...watchlist.stocks]
  const {
    selectedItems: selectedAssets,
    isItemSelected: isAssetSelected,
    toggleItem: toggleAsset,
  } = useSelectedItems(assets)

  return (
    <div className="h-full">
      <DndProvider backend={HTML5Backend}>
        <div className="h-96 w-full mb-16">
          <AssetsChart
            assets={selectedAssets}
            onDropAsset={toggleAsset}
          />
        </div>
        <div className="w-full">
          <WatchlistAssets title="Cryptos">
            {watchlist.cryptos.map(crypto => (
              <AssetCard
                key={crypto.id}
                className="mr-4"
                asset={crypto}
                isSelected={isAssetSelected(crypto)}
                onClick={() => toggleAsset(crypto)}
              />
            ))}
          </WatchlistAssets>
          <WatchlistAssets title="Stocks">
            {watchlist.stocks.map(stock => (
              <AssetCard
                key={stock.id}
                className="mr-4"
                asset={stock}
                isSelected={isAssetSelected(stock)}
                onClick={() => toggleAsset(stock)}
              />
            ))}
          </WatchlistAssets>
        </div>
      </DndProvider>
    </div>
  )
}

export default WatchlistContent
