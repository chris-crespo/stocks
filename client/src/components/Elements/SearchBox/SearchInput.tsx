import clsx from "clsx"
import React from "react"

type Props = React.InputHTMLAttributes<HTMLInputElement> & {

}

// TODO: SearchBox could be a pure component, leaving debouncing
// and state management as an implementation decision
const SearchInput = React.forwardRef<HTMLInputElement, Props>(({ className, ...props }, ref) => (
  <input
    className={clsx(
      "appearance-none border border-gray-300 hover:border-gray-400 rounded-lg",
      "focus:border-transparent focus:ring-2 focus:ring-indigo-600 focus:outline-none",
      "shadow-sm shadow-gray-100",
      "text-[14px] w-full px-4 py-2",
      className
    )}
    ref={ref}
    {...props}
  />
))

export default SearchInput 
