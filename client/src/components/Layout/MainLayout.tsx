import clsx from "clsx";
import { GrFormDown, GrFormUp, GrPieChart } from 'react-icons/gr'
import { FiLogOut, MdStackedLineChart } from 'react-icons/all'
import { useLocation } from "react-router-dom";
import { NavLink } from "react-router-dom";
import useDisclosure from "~/hooks/useDisclosure";
import Head from "../Head";
import { Button } from "../Elements";
import { useAuth } from "~/lib/auth";

type NavigationCategory = {
  name: string;
  icon: JSX.Element
  items: NavigationCategoryItem[]
}

type NavigationCategoryItem = {
  name: string;
  to: string;
}

type CategoryProps = {
  category: NavigationCategory
}

const Category = ({ category }: CategoryProps) => {
  const location = useLocation()
  const { isOpen, toggle } = useDisclosure(category.items.some(item => item.to === location.pathname))

  return (
    <div className="w-72 pl-6 pr-7">
      <div className={"hover:bg-gray-100 px-3.5 py-2 cursor-pointer rounded-lg"} onClick={toggle}>
        <div className="flex items-center">
          <span className="text-xl mr-3.5">
            {category.icon}
          </span>
          <span className="font-medium">{category.name}</span>
          <span className="ml-auto">
            {isOpen ? <GrFormUp /> : <GrFormDown />}
          </span>
        </div>
      </div>
      {isOpen && (
        <div>
          {category.items.map(item => (
            <NavLink key={item.name} to={item.to} className={({ isActive }) => clsx(
              "flex relative items-center text-gray-500 hover:bg-gray-100 px-12 py-2 cursor-pointer rounded-lg",
              "before:inline-block before:w-[5px] before:h-[5px] before:rounded-full before:bg-gray-200",
              "before:absolute before:z-10 before:left-[21.5px]",
              "after:w-px after:bg-gray-200 after:absolute after:left-[23.5px]",
              "after:top-0 after:bottom-0 first:after:top-1/2 last:after:bottom-1/2",
              isActive && "bg-gray-100 text-indigo-600 before:bg-indigo-600"
            )}>
              {item.name}
            </NavLink>
          ))}
        </div>
      )}
    </div>
  )
}

const SideNavigation = () => {
  const categories = [
    {
      name: 'Market',
      icon: <MdStackedLineChart />,
      items: [
        {
          name: 'Cryptos',
          to: '/market/cryptos'
        },
        {
          name: 'Stocks',
          to: '/market/stocks'
        }
      ]
    },
    {
      name: 'Watchlists',
      icon: <GrPieChart />,
      items: [
        {
          name: 'My watchlists',
          to: '/watchlists/my'
        }
      ]
    }
  ] as NavigationCategory[]

  return (
    <>
      {categories.map(category => (
        <div key={category.name}>
          <Category category={category} />
        </div>
      ))}
    </>
  )
}

const Sidebar = () => {
  const { logout } = useAuth()

  return (
    <div className="flex flex-col h-full pt-24">
      <SideNavigation />
      <div className="mt-auto pl-6 pr-7 py-8">
        <Button className="bg-red-400 text-sm hover:bg-red-300" onClick={() => logout()}>
          <span className="flex justify-center items-center">
            <span className="mr-2"><FiLogOut /></span>
            Logout
          </span>
        </Button>
      </div>
    </div>
  )
}

type MainLayoutProps = {
  children: React.ReactNode
  title: string
}

const MainLayout = ({ children, title }: MainLayoutProps) => {
  return (
    <>
      <Head title={title} />
      <div className="h-screen flex">
        <Sidebar />
        <section className="grow px-8 pt-7 pb-10">
          <header className="mb-11">
            <h1 className="text-2xl">{title}</h1>
          </header>
          {children}
        </section>
      </div>
    </>
  )
}

export default MainLayout
