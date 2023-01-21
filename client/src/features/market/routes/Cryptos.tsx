import { useState } from "react"
import { Pagination, SearchBox } from "~/components/Elements"
import { MainLayout } from "~/components/Layout"
import usePage from "~/hooks/usePage"
import { usePaginatedCryptos } from "../api/getPaginatedMarketAssets"
import AssetsList from "../components/AssetsList"

const Cryptos = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const { page, setPage } = usePage()
  const { data } = usePaginatedCryptos({
    page,
    size: 10,
    searchTerm,
  })

  return (
    <MainLayout title="Cryptos">
      <SearchBox
        className="mb-8"
        onSearch={setSearchTerm}
        placeholder="Search crypto..."
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

export default Cryptos

