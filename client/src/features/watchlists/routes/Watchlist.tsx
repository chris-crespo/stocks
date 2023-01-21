import { useState } from "react"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import { useParams } from "react-router-dom"
import { MainLayout } from "~/components/Layout"
import { TAsset } from "~/features/assets"
import { useWatchlist } from "../api/getWatchlist"
import AssetsChart from "../components/Watchlist/AssetsChart"
import SelectedAssets from "../components/Watchlist/SelectedAssets"
import WatchlistAssets from "../components/Watchlist/WatchlistAssets"
import WatchlistHeader from "../components/Watchlist/WatchlistHeader"

const Watchlist = () => {
  const { id } = useParams()

  const [selectedAssets, setSelectedAssets] = useState<TAsset[]>([])
  const selectAsset = (asset: TAsset) => {
    if (!selectedAssets.find(asset2 => asset.id === asset2.id)) {
      setSelectedAssets(prev => [...prev, asset])
    }
  }

  const { data } = useWatchlist({ id: id! })
  if (!data) return null

  const { watchlist } = data.data

  return (
    <MainLayout title="Watchlist">
      <WatchlistHeader name={watchlist.name} description={watchlist.description} />
      <div className="flex">
        <DndProvider backend={HTML5Backend}>
          <WatchlistAssets cryptos={watchlist.cryptos} stocks={watchlist.stocks} />
          <div className="w-full flex flex-column">
            <AssetsChart assets={selectedAssets} />
            <SelectedAssets assets={selectedAssets} onSelect={selectAsset} />
          </div>
        </DndProvider>
      </div>
    </MainLayout>
  )
}

export default Watchlist
