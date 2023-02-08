import clsx from "clsx"

type Props = React.HTMLAttributes<HTMLButtonElement> & {
  selected: boolean
}

const WatchlistFilter = ({ selected, children, ...props }: Props) => {
  return (
    <button {...props} className={clsx(
      !selected && "text-gray-400",
      "hover:text-gray-900",
      "px-4 py-2"
    )}>
      <span>{children}</span>
    </button>
  )
}

export default WatchlistFilter
