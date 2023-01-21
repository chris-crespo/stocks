import React, { useState } from "react"
import clsx from "clsx"
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi'
import { range, isLastIndex } from '~/utils/list'
import usePage from '~/hooks/usePage'

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  active?: boolean
  children: React.ReactNode
}

const Button = ({ active, children, className, disabled, onClick, ...props }: ButtonProps) => (
  <button onClick={onClick} disabled={disabled} className={clsx(
    "w-8 h-8 inline-flex flex-center rounded-lg",
    active && "text-indigo-600 bg-gray-100",
    disabled && "cursor-not-allowed text-gray-400",
    className
  )} {...props}>
    {children}
  </button>
)

type PaginationProps = {
  onChange: (page: number) => void
  size: number
  total: number
}

const slicePages = (page: number, numberOfPages: number) => {
  if (numberOfPages <= 5)
    return [range(1, Math.max(2, numberOfPages + 1))]

  if (page < 5)
    return [range(1, 6), [numberOfPages]]

  if (page > numberOfPages - 4)
    return [[1], range(numberOfPages - 4, numberOfPages + 1)]

  return [[1], range(page - 2, page + 3), [numberOfPages]]
}

const Pagination = ({ onChange, size, total }: PaginationProps) => {
  const { page, prev, next, setPage } = usePage()

  const [prevTotal, setPrevTotal] = useState(total)
  if (total !== prevTotal) {
    setPrevTotal(total)
    setPage(1)
    onChange(1)
  }

  const numberOfPages = Math.ceil(total / size)
  const slices = slicePages(page, numberOfPages)

  return (
    <div className="flex justify-end p-4">
      <div className="flex">
        <Button disabled={page === 1} onClick={() => {
          prev()
          onChange(page - 1)
        }}>
          <BiChevronLeft />
        </Button>
        <span>
          {slices.map((slice, i) => (
            <React.Fragment key={i}>
              {slice.map(selectedPage => (
                <Button
                  key={selectedPage}
                  active={page === selectedPage}
                  className="mx-1 hover:bg-gray-100"
                  onClick={() => {
                    setPage(selectedPage)
                    onChange(selectedPage)
                  }}
                >{selectedPage}</Button>
              ))}
              {!isLastIndex(i, slices) && (
                <span className="w-8 h-8 inline-flex flex-center cursor-default">...</span>
              )}
            </React.Fragment>
          ))}
        </span>
        <Button disabled={numberOfPages === 0 || page === numberOfPages} onClick={() => {
          next()
          onChange(page + 1)
        }}>
          <BiChevronRight />
        </Button>
      </div>
    </div >
  )
}

export default Pagination
