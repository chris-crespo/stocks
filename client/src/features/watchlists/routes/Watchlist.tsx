import { useNavigate, useParams } from "react-router-dom"
import { MainLayout } from "~/components/Layout"
import { useWatchlist } from "../api/getWatchlist"
import WatchlistContent from "../components/WatchlistContent"
import WatchlistHeader from "../components/WatchlistHeader"

const Watchlist = () => {
  const { id } = useParams()
  const { data, isLoading, isError } = useWatchlist({ id: id! })

  const navigate = useNavigate()
  if (!isLoading && isError) {
    navigate('/watchlists')
  }

  const watchlist = data?.data.watchlist
  if (!watchlist) {
    return null
  }

  return (
    <MainLayout title="Watchlist">
      <WatchlistHeader name={watchlist.name} description={watchlist.description} />
      <WatchlistContent watchlist={watchlist} />
    </MainLayout>
  )
}

export default Watchlist
