import clsx from "clsx";
import { UseFormRegisterReturn } from "react-hook-form"
import FieldWrapper, { FieldWrapperPassThroughProps } from "./FieldWrapper";

type Props = React.InputHTMLAttributes<HTMLInputElement> & FieldWrapperPassThroughProps & {
  registration: Partial<UseFormRegisterReturn>
}

const InputField: React.FC<Props> = ({ error, className, label, registration, ...props }) => {
  return (
    <FieldWrapper error={error} label={label}>
      <input
        className={clsx(
          className,
          "appearance-none border border-gray-300 hover:border-gray-400 rounded-lg",
          "focus:border-transparent focus:ring-2 focus:ring-indigo-600 focus:outline-none",
          "shadow-sm shadow-gray-100",
          "text-[14px] w-full px-4 py-2"
        )}
        {...props}
        {...registration}
      />
    </FieldWrapper>
  )
}

export default InputField
