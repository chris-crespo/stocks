import { Menu, Transition } from "@headlessui/react"
import clsx from "clsx"
import { Fragment } from "react"
import { AiFillCaretDown, AiFillCaretUp } from 'react-icons/ai'
import { TbDotsVertical } from 'react-icons/tb'
import { Link } from "react-router-dom"
import { TSymbol } from "~/features/assets"
import { TName, TPrice } from "~/types"
import { TGrowth } from "../types"

type NameCellProps = {
  name: TName,
  symbol: TSymbol
}

export const NameCell = ({ name, symbol }: NameCellProps) => (
  <div className="flex">
    <div className="max-w-xs truncate">
      <span className="shrink-0 font-medium mr-1.5">{name}</span>
    </div>
    {' '}
    <span className="text-gray-400">{symbol}</span>
  </div>
)

type PriceCellProps = {
  price: TPrice
}

export const PriceCell = ({ price }: PriceCellProps) => (
  <div className="text-right">
    <span>${price.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: price > 1 ? 2 : undefined
    })}</span>
  </div>
)

type PercentChangeCellProps = {
  percentChange: TGrowth
}

export const PercentChangeCell = ({ percentChange }: PercentChangeCellProps) => {
  const isNegative = percentChange < 0

  return (
    <div className={clsx(
      "flex items-center justify-end",
      isNegative ? "text-red-600" : "text-green-600"
    )}>
      <span className="text-xs">{isNegative ? <AiFillCaretDown /> : <AiFillCaretUp />}</span>
      <span>{Math.abs(percentChange).toFixed(2)}%</span>
    </div>
  )
}

type MarketCapCellProps = {
  marketCap: TPrice
}

export const MarketCapCell = ({ marketCap }: MarketCapCellProps) => (
  <div className="text-right">
    <span>${marketCap.toLocaleString('en-US', { maximumFractionDigits: 0 })}</span>
  </div>
)

type ActionsCellProps = {
  slug: string
}

export const ActionsCell = ({ slug }: ActionsCellProps) => (
  <div className="h-full cursor-pointer text-xl px-2 inline-block">
    <Menu as="div" className="relative">
      <Menu.Button>
        <TbDotsVertical />
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-75"
      >
        <Menu.Items className="absolute right-0 z-10 w-48 bg-white rounded-lg border border-gray-300 shadow-sm shadow-gray-100 text-left">
          <div className="p-1">
            <Menu.Item>
              {({ active }) => (
                <Link
                  className={clsx(
                    "flex w-full text-sm px-4 py-3 mb-1 rounded-lg",
                    active && 'bg-gray-100'
                  )}
                  to={`./${slug}`}
                >
                  View charts
                </Link>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <Link
                  className={clsx(
                    "flex w-full text-sm px-4 py-3 mb-1 rounded-lg",
                    active && 'bg-gray-100'
                  )}
                  to={`./${slug}/historical`}
                >
                  View historical data
                </Link>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button className={clsx(
                  "flex w-full text-sm px-4 py-3 rounded-lg",
                  active && "bg-gray-100"
                )}>
                  Add to watchlist
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  </div>
)
