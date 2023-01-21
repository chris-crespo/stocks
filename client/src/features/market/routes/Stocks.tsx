import { useState } from "react"
import { Pagination, SearchBox } from "~/components/Elements"
import { MainLayout } from "~/components/Layout"
import { usePaginatedStocks } from "../api/getPaginatedMarketAssets"
import AssetsList from "../components/AssetsList"

const Stocks = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [page, setPage] = useState(1)
  const { data } = usePaginatedStocks({
    page,
    size: 10,
    searchTerm,
  })

  return (
    <MainLayout title="Stocks">
      <SearchBox
        className="mb-8"
        onSearch={setSearchTerm}
        placeholder="Search stock..."
        autoFocus
      />
      <AssetsList assets={data?.data.page.data ?? []} />
      <Pagination
        onChange={setPage}
        size={10}
        total={data?.data.page.total ?? 0}
      />
    </MainLayout>
  )
}

export default Stocks
