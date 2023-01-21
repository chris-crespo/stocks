import { zodResolver } from "@hookform/resolvers/zod"
import { FieldError, SubmitHandler, useForm } from "react-hook-form"
import Button from "~/components/Elements/Button"
import { InputField } from "~/components/Form"
import { useAuth } from "~/lib/auth"
import type { TRegisterCredentials, TRegisterFailure } from "../types"
import * as schemas from '../schemas'
import FormTitle from "./FormTitle"
import { entries } from "~/utils/object"

// TODO: Refactor component
const RegisterForm: React.FC = () => {
  const auth = useAuth()
  const {
    formState: { errors },
    handleSubmit,
    register,
    setError
  } = useForm<TRegisterCredentials>({
    resolver: zodResolver(schemas.RegisterCredentials)
  })

  const onSubmit: SubmitHandler<TRegisterCredentials> = async values => {
    const result = await auth.register(values)
    if (result.ok) return;

    const { val: err } = result
    entries<TRegisterFailure['errors']>(err.errors).forEach(entry => {
      const [key, messages] = entry!
      setError(key, { type: 'custom', message: messages![0] })
    })
  }

  return (
    <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
      <FormTitle title="Sign up to Stock Seer" />

      <div className="mb-4">
        <InputField
          type="text"
          placeholder="Name"
          registration={register('name')}
          error={errors.name as FieldError}
          autoComplete="name"
          autoFocus
        />
      </div>

      <div className="mb-4">
        <InputField
          type="email"
          placeholder="Email address"
          registration={register('email')}
          error={errors.email as FieldError}
          autoComplete="email"
        />
      </div>

      <div className="mb-8">
        <InputField
          type="password"
          placeholder="Password (6+ characters)"
          registration={register('password')}
          error={errors.password as FieldError}
          autoComplete="new-password"
        />
      </div>

      <Button type="submit">Create account</Button>
    </form>
  )
}

export default RegisterForm
