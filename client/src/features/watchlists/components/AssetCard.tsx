import clsx from "clsx"
import { useDrag } from "react-dnd"
import { TAsset } from "~/features/assets"

type Props = React.HTMLAttributes<HTMLDivElement> & {
  asset: TAsset
  isSelected: boolean
}

const AssetCard = ({ asset, isSelected, className, ...props }: Props) => {
  const [collected, drag, dragPreview] = useDrag(() => ({
    type: 'AssetCard',
    item: asset
  }))

  return (
    <div
      {...props}
      className={clsx(
        "border border-gray-100 rounded-lg",
        "px-3 py-2 text-sm w-56 hover:cursor-grab",
        !isSelected && "hover:border-gray-400",
        isSelected && "ring-2 ring-indigo-500 hover:ring-indigo-300",
        className
      )}
      ref={drag}
    >
      <div className="flex mb-1">
        <h3>{asset.name}</h3>
        {/* <p className="ml-auto">${asset.}</p>*/}
      </div>
      <p className="text-gray-500">{asset.symbol}</p>
    </div>
  )
}

export default AssetCard
