import { Disclosure } from "@headlessui/react"
import { Chip, DisclosureButton, DisclosurePanel } from "~/components/Elements"
import { AssetKind, TAsset } from "~/features/assets"
import { isEmpty } from "~/utils/list"
import { capitalize } from "~/utils/string"
import SearchAsset from "./SearchAsset"

type Props = {
  assetKind: AssetKind
  assets: TAsset[]
  onSelect: (asset: TAsset) => void
  onRemove: (asset: TAsset) => void
}

const SelectAssets = ({ assets, assetKind, onSelect, onRemove }: Props) => (
  <Disclosure as="div" className="mt-2" defaultOpen={true}>
    {({ open }) => (
      <>
        <DisclosureButton open={open}>
          <h3>{capitalize(assetKind)}s</h3>
        </DisclosureButton>
        <DisclosurePanel>
          <SearchAsset assetKind={assetKind} onSelect={onSelect} />
          <div className="mb-2">
            <h3 className="mb-3">Selected {assetKind}s</h3>
            <div>
              {isEmpty(assets) ? (
                <p className="text-sm text-gray-400">No {assetKind}s selected.</p>
              ) : (assets.map(asset => (
                <Chip key={asset.id} onClick={() => onRemove(asset)}>
                  {asset.symbol}
                </Chip>
              )))}
            </div>
          </div>
        </DisclosurePanel>
      </>
    )}
  </Disclosure>
)

export default SelectAssets
