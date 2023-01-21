import { useParams } from "react-router-dom"
import { MainLayout } from "~/components/Layout"

const Stock = () => {
  const { symbol } = useParams()
  return <MainLayout title={symbol!}>

  </MainLayout>
}

export default Stock
