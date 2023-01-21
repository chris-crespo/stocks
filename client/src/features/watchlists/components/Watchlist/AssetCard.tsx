import { useDrag } from "react-dnd"
import { TWatchlistAsset } from "../../types"

type Props = {
  asset: TWatchlistAsset
}

const AssetCard = ({ asset }: Props) => {
  const [collected, drag, dragPreview] = useDrag(() => ({
    type: 'AssetCard',
    item: {
      ...asset,
      quote: 0 //quote
    }
  }))

  return (
    <div
      className="border border-gray-100 rounded-lg px-3 py-2 text-sm mb-2 last:mb-0 hover:border-gray-400 hover:cursor-grab"
      ref={drag}
    >
      <div className="flex mb-1">
        <h3>{asset.name}</h3>
        {/*<p className="ml-auto">${quote.high}</p>*/}
      </div>
      <p className="text-gray-500">{asset.symbol}</p>
    </div>
  )
}

export default AssetCard
