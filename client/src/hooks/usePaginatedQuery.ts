import { useState } from "react"
import { useQuery, UseQueryOptions } from "react-query"
import { TBasePaginated } from "~/types"

const usePaginatedQuery = <T>(opts: UseQueryOptions<TBasePaginated<T>>) => {
  const [page, setPage] = useState(0)

  const query = useQuery<TBasePaginated<T>>({
    ...opts,
    queryKey: [(opts.queryKey ?? []), page],
    keepPreviousData: true
  })

  return {
    ...query,
    setPage
  }
}

export default usePaginatedQuery
