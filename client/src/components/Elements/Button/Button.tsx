import clsx from 'clsx'

type Props = React.ButtonHTMLAttributes<HTMLButtonElement>

const Button: React.FC<Props> = ({ children, className, ...props }) => (
  <button
    className={clsx(
      className,
      "w-full px-4 py-3 rounded-lg font-medium",
      "bg-indigo-600 hover:bg-indigo-500 text-white",
      "disabled:cursor-not-allowed disabled:bg-indigo-300"
    )}
    {...props}
  >
    <span>{children}</span>
  </button>
)

export default Button
