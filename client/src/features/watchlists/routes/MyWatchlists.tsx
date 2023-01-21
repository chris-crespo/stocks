import { useState } from "react"
import { Pagination, SearchBox } from "~/components/Elements"
import { MainLayout } from "~/components/Layout"
import usePage from "~/hooks/usePage"
import { useMyWatchlists } from "../api/getMyWatchlists"
import CreateWatchlist from "../components/CreateWatchlist"
import WatchlistsList from "../components/WatchlistsList"

const MyWatchlists = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const { page, setPage } = usePage()
  const { data } = useMyWatchlists({
    page,
    size: 10,
    searchTerm
  })

  return (
    <MainLayout title="My Watchlists">
      <CreateWatchlist />
      <div className="mb-8">
        <SearchBox
          placeholder="Search watchlist..."
          onSearch={setSearchTerm}
          autoFocus
        />
      </div>
      <WatchlistsList watchlists={data?.data.page.data ?? []} />
      <Pagination onChange={setPage} size={10} total={data?.data.page.total ?? 0} />
    </MainLayout>
  )
}

export default MyWatchlists
