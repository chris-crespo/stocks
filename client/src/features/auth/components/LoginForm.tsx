import { FieldError, SubmitHandler, useForm } from "react-hook-form"
import { InputField } from "~/components/Form"
import Button from "~/components/Elements/Button"
import FormTitle from "./FormTitle"
import { useAuth } from "~/lib/auth"
import { zodResolver } from "@hookform/resolvers/zod"
import { TLoginCredentials, TLoginFailure } from "../types"
import { LoginCredentials } from "../schemas"
import { entries } from "~/utils/object"

// TODO: Refactor component
const LoginForm: React.FC = () => {
  const { login } = useAuth()
  const {
    formState: { errors, isValid },
    handleSubmit,
    register,
    setError
  } = useForm<TLoginCredentials>({
    resolver: zodResolver(LoginCredentials)
  })

  const onSubmit: SubmitHandler<TLoginCredentials> = async values => {
    const result = await login(values)
    if (result.ok) return;

    const { val: err } = result;
    entries<TLoginFailure['errors']>(err.errors).forEach(entry => {
      const [key, messages] = entry!
      setError(key, { type: 'custom', message: messages![0] })
    })
  }

  return (
    <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
      <FormTitle title="Sign in to Stock Seer" />

      <div className="mb-4">
        <InputField
          type="email"
          placeholder="Email address"
          registration={register('email')}
          error={errors.email as FieldError}
          autoComplete="email"
          autoFocus
        />
      </div>

      <div className="mb-8">
        <InputField
          type="password"
          placeholder="Password"
          registration={register('password')}
          error={errors.password as FieldError}
          autoComplete="new-password"
        />
      </div>

      <Button type="submit" disabled={!isValid}>Sign in</Button>
    </form>
  )
}

export default LoginForm
