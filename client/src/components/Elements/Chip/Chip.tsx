import clsx from "clsx"

type Props = React.HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode
}

const Chip = ({ children, className, ...props }: Props) => (
  <div
    className={clsx(
      "inline-block border-2 border-indigo-600 rounded-full mx-1 first:ml-0 last:mr-0 px-3 py-1 text-indigo-600 text-xs font-medium hover:border-red-600 hover:text-red-600 cursor-pointer",
      className
    )}
    {...props}
  >
    {children}
  </div>
)

export default Chip
