import React from "react";
import { Dialog, Transition } from "@headlessui/react"

type Props = {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  renderTitle: () => React.ReactNode;
  renderFooter: () => React.ReactNode;
}

const Drawer = ({ children, isOpen, onClose, renderTitle, renderFooter }: Props) => (
  <Transition.Root show={isOpen} as={React.Fragment}>
    <Dialog
      as="div"
      className="fixed z-40 inset-0 right-0 bg-[rgba(0,0,0,0.1)]"
      static
      open={isOpen}
      onClose={onClose}
    >
      <Dialog.Panel as="div" className="absolute inset-y-0 right-0 bg-white h-screen flex flex-col">
        <div className="w-screen max-w-xl px-8 py-7 overflow-auto">
          <Dialog.Title className="text-2xl">
            {renderTitle()}
          </Dialog.Title>
          {children}
        </div>
        <div className="bg-gray-100 px-8 py-6 mt-auto">
          {renderFooter()}
        </div>
      </Dialog.Panel>
    </Dialog>
  </Transition.Root>
)

export default Drawer
