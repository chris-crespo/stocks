import { Link } from "react-router-dom"
import { Chip, Table } from "~/components/Elements"
import { TAsset } from "~/features/assets"
import { TWatchlist } from "../types"

type AssetsProps = {
  assets: TAsset[]
}

const Assets = ({ assets }: AssetsProps) => (
  <div className="flex items-center">
    {assets.slice(0, 3).map(asset => (
      <Chip className="hover:border-indigo-600 hover:text-indigo-600">
        {asset.symbol}
      </Chip>)
    )}
    <span className="ml-2">
      {assets.length > 3 && `+ ${assets.length - 3}`}
    </span>
  </div>
)

type WatchlistsListProps = {
  watchlists: TWatchlist[]
}

const WatchlistsList = ({ watchlists }: WatchlistsListProps) => (
  <Table<TWatchlist>
    data={watchlists}
    columns={[
      {
        title: 'Name',
        Cell: ({ entry: { id, name } }) => (
          <Link to={`/watchlists/${id}`} >
            {name}
          </Link >
        )
      },
      {
        title: 'Description',
        field: 'description',
      },
      {
        title: 'Cryptos',
        Cell: ({ entry: { cryptos } }) => <Assets assets={cryptos} />
      },
      {
        title: 'Stocks',
        Cell: ({ entry: { stocks } }) => <Assets assets={stocks} />
      }
    ]}
  />
)

export default WatchlistsList
