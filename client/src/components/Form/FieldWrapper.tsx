import clsx from "clsx"
import { FieldError } from "react-hook-form"

type Props = {
  children: React.ReactNode
  className?: string
  label?: string
  error?: FieldError
}

export type FieldWrapperPassThroughProps = Omit<Props, 'className' | 'children'>

const FieldWrapper = ({ children, className, label, error }: Props) => {
  return (
    <div>
      {label && (
        <div className="mb-3">
          <label>{label}</label>
        </div>
      )}
      <div className={clsx('mb-4', className)}>
        {children}
      </div>
      {error?.message && (
        <span className="text-sm text-red-500">{error.message}</span>
      )}
    </div>
  )
}

export default FieldWrapper
