import { Children } from "react"

type AssetsProps = {
  title: string
  children: React.ReactNode
}

const WatchlistAssets = ({ title, children }: AssetsProps) => {
  const isEmpty = Children.count(children) === 0

  return (
    <div className="flex flex-col mb-8">
      <h2 className="mb-4">{title}</h2>
      <div className="flex">
        {isEmpty ? (
          <span className="text-sm text-gray-400">
            There are no {title.toLowerCase()}.
          </span>
        ) : children}
      </div>
    </div>
  )
}

export default WatchlistAssets
