import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { Drawer } from "~/components/Elements"
import { Button, CreateButton } from "~/components/Elements"
import useDisclosure from "~/hooks/useDisclosure"
import CreateWatchlistForm from "./CreateWatchlistForm";

const CreateWatchlist = () => {
  const { isOpen, open, close } = useDisclosure()
  const [buttonDisabled, setButtonDisabled] = useState(false)

  return (
    <>
      <div className="absolute top-0 right-0 mr-8 mt-7">
        <CreateButton onClick={open} />
      </div>
      <Drawer
        isOpen={isOpen}
        onClose={close}
        renderTitle={() => (
          <div className="flex items-center mb-8">
            <h1 className="ml-4">
              Add Watchlist
            </h1>
            <div className="flex items-center ml-auto">
              <button
                type="button"
                className="hover:bg-gray-100 mr-1.5 p-2 rounded-lg text-xl"
                onClick={close}
              >
                <IoMdClose />
              </button>
            </div>
          </div>
        )}
        renderFooter={() => (
          <div>
            <Button
              type="submit"
              form='create-watchlist-form'
              className="font-normal py-[8px]"
              disabled={buttonDisabled}
            >
              Create watchlist
            </Button>
          </div>
        )}
      >
        <CreateWatchlistForm
          setCanSubmit={canSubmit => setButtonDisabled(!canSubmit)}
          closeDrawer={close}
        />
      </Drawer>
    </>
  )
}

export default CreateWatchlist
