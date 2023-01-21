import { useParams } from "react-router-dom"
import { MainLayout } from "~/components/Layout"

const Crypto = () => {
  const { symbol } = useParams()
  return <MainLayout title={symbol!}>

  </MainLayout>
}

export default Crypto
