import { HiOutlinePlus } from 'react-icons/hi'

type Props = React.ButtonHTMLAttributes<HTMLButtonElement>

const CreateButton = ({ onClick, ...props }: Props) => (
  <button
    onClick={onClick}
    className="w-9 h-9 rounded-full bg-indigo-600 flex flex-center"
    {...props}
  >
    <HiOutlinePlus className="text-white text-lg" />
  </button>
)

export default CreateButton
