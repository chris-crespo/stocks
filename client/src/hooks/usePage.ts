import { useState } from "react"

const usePage = (initial: number = 1) => {
  const [page, setPage] = useState(initial)

  const prev = () => setPage(prev => prev - 1)
  const next = () => setPage(prev => prev + 1)

  return { page, prev, next, setPage }
}

export default usePage
