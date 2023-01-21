import { Disclosure as UIDisclosure } from "@headlessui/react"
import { GrFormDown, GrFormUp } from "react-icons/gr"

type DisclosureButtonProps = {
  children: React.ReactNode
  open: boolean;
}

export const DisclosureButton = ({ children, open }: DisclosureButtonProps) => (
  <UIDisclosure.Button className="w-full flex items-center bg-gray-100 hover:bg-gray-200 rounded-lg px-4 py-2">
    {children}
    <div className="ml-auto">
      {open ? <GrFormUp /> : <GrFormDown />}
    </div>
  </UIDisclosure.Button>
)

type DisclosurePanelProps = {
  children: React.ReactNode
}

export const DisclosurePanel = ({ children }: DisclosurePanelProps) => (
  <UIDisclosure.Panel>
    <div className="px-4 py-6">
      {children}
    </div>
  </UIDisclosure.Panel>
)

type DisclosureRenderPropArg = {
  open: boolean;
}

type DisclosureProps = {
  children: (bag: DisclosureRenderPropArg) => React.ReactElement
  defaultOpen?: boolean
}

export const Disclosure = ({ defaultOpen, children }: DisclosureProps) => (
  <div className="mb-2">
    <UIDisclosure defaultOpen={defaultOpen}>
      {children}
    </UIDisclosure>
  </div>
)
