import { Disclosure } from "@headlessui/react"
import { FieldError, FieldErrorsImpl, UseFormRegisterReturn } from "react-hook-form"
import { DisclosureButton, DisclosurePanel } from "~/components/Elements"
import { InputField } from "~/components/Form"
import { TCreateWatchlistFields } from "../../types"

type Props = {
  name: Partial<UseFormRegisterReturn>
  description: Partial<UseFormRegisterReturn>
  errors: Partial<FieldErrorsImpl<TCreateWatchlistFields>>
}

const GeneralData = ({ name, description, errors }: Props) => (
  <Disclosure defaultOpen={true}>
    {({ open }) => (
      <>
        <DisclosureButton open={open}>
          <h3>General</h3>
        </DisclosureButton>
        <DisclosurePanel>
          <div className="mb-6">
            <InputField
              type="text"
              label="Name"
              registration={name}
              error={errors.name as FieldError}
              autoFocus
            />
            <div className="mt-3">
              <p className="text-sm text-gray-600">
                Give your watchlist a short and clear name.
              </p>
            </div>
          </div>
          <div className="mb-2">
            <InputField
              type="text"
              label="Description"
              registration={description}
              error={errors.description as FieldError}
            />
            <div className="mt-3">
              <p className="text-sm text-gray-600">
                A description will help others understand the purpose of your watchlist.
              </p>
            </div>
          </div>
        </DisclosurePanel>
      </>
    )}
  </Disclosure>
)

export default GeneralData
