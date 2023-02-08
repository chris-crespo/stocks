import Head from "~/components/Head"
import { Review } from "~/features/review"

type Props = {
  children: React.ReactNode
  title?: string
}

const Layout: React.FC<Props> = ({ children, title }) => (
  <>
    <Head title={title} />
    <div className="flex">
      <div className="w-1/2 min-h-screen flex justify-center items-center px-8 py-32">
        <div className="w-full max-w-[500px] flex items-center">
          {children}
        </div>
      </div>
      <div className="w-1/2 min-h-screen bg-indigo-300 flex justify-center items-center">
        <Review />
      </div>
    </div>
  </>
)

export default Layout
