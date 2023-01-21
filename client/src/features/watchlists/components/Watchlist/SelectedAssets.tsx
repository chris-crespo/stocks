import { useDrop } from "react-dnd"
import { TWatchlistAsset } from "../../types"
import AssetCard from "./AssetCard"

type Props = {
  assets: TWatchlistAsset[]
  onSelect: (asset: TWatchlistAsset) => void
}

const SelectedAssets = ({ assets, onSelect }: Props) => {
  const [, drop] = useDrop<TWatchlistAsset>(() => ({
    accept: 'AssetCard',
    drop: onSelect
  }), [assets])

  return (
    <div ref={drop} className="w-full bg-gray-100">
      {assets.map(asset => (
        <AssetCard key={asset.id} asset={asset} />
      ))}
    </div>
  )
}

export default SelectedAssets
