import { useEffect, useState } from "react";
import useDebounce from "~/hooks/useDebounce";
import SearchInput from "./SearchInput";

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  onSearch: (value: string) => void;
}

// TODO: SearchBox could be a pure component, leaving debouncing
// and state management as an implementation decision
const SearchBox = ({ onSearch, className, ...props }: Props) => {
  const [value, setValue] = useState('')
  const debouncedValue = useDebounce(value)

  useEffect(() => {
    onSearch(debouncedValue)
  }, [debouncedValue])

  return (
    <div>
      <SearchInput
        value={value}
        onChange={e => setValue(e.target.value)} {...props}
        {...props}
      />
    </div>
  )
}

export default SearchBox
