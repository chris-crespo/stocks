import Head from "~/components/Head"

type Props = {
  children: React.ReactNode
  title?: string
}

const Layout: React.FC<Props> = ({ children, title }) => (
  <>
    <Head title={title} />
    <div className="min-h-screen flex justify-center items-center px-8 py-32">
      <div className="w-full max-w-[500px] flex items-center">
        {children}
      </div>
    </div>
  </>
)

export default Layout
