import { Combobox } from "@headlessui/react"
import { useEffect, useState } from "react"
import { SearchInput } from "~/components/Elements"
import { AssetKind, TAsset, useSearchAssets } from "~/features/assets"
import useDebounce from "~/hooks/useDebounce"

type Props = {
  assetKind: AssetKind
  onSelect: (asset: TAsset) => void;
}

const SearchAsset = ({ assetKind, onSelect }: Props) => {
  const [selectedAsset, setSelectedAsset] = useState<TAsset | null>(null)
  const [query, setQuery] = useState('')
  const debouncedQuery = useDebounce(query, 300)
  const { data } = useSearchAssets({
    kind: assetKind,
    searchTerm: debouncedQuery,
  })

  const assets = data?.data.page.data ?? [];

  const consumeSelectedAsset = () => {
    const asset = selectedAsset
    setSelectedAsset(null)
    return asset
  }

  useEffect(() => {
    if (selectedAsset) {
      onSelect(consumeSelectedAsset()!)
    }
  }, [selectedAsset])

  return (
    <Combobox
      as="div"
      className="relative"
      value={selectedAsset}
      onChange={setSelectedAsset}
    >
      <Combobox.Input<any, TAsset>
        as={SearchInput}
        onChange={e => setQuery(e.target.value)}
        displayValue={asset => asset?.name}
        className="mb-6"
        placeholder={`Search ${assetKind}...`}
      />
      <Combobox.Options className="absolute z-20 top-12 bg-white w-full rounded-lg border border-gray-300 shadow-sm shadow-gray-100 py-1">
        {assets.map(asset => (
          <Combobox.Option
            className="cursor-pointer hover:bg-gray-100 px-4 py-3 text-sm"
            key={asset.id}
            value={asset}
          >
            {asset.name}
          </Combobox.Option>
        ))}
      </Combobox.Options>
    </Combobox >
  )
}

export default SearchAsset
