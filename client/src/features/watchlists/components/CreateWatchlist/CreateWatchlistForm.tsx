import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { TAsset } from "~/features/assets"
import { TId } from "~/types"
import { entries } from "~/utils/object"
import { useCreateWatchlist } from "../../api/createWatchlist"
import { CreateWatchlistFields } from "../../schemas"
import {
  TCreateWatchlistFields,
  TCreateWatchlistFailure
} from "../../types"
import GeneralData from "./GeneralData"
import SelectAssets from "./SelectAssets"

type Props = {
  setCanSubmit: (canSubmit: boolean) => void
  onCreate: (watchlistId: TId) => void
}

const CreateWatchlistForm = ({ setCanSubmit, onCreate }: Props) => {
  const createWatchlist = useCreateWatchlist()
  const {
    formState: { errors, isValid },
    handleSubmit,
    register,
    setError,
    setValue,
    watch
  } = useForm<TCreateWatchlistFields>({
    defaultValues: { cryptos: [], stocks: [] },
    resolver: zodResolver(CreateWatchlistFields)
  })

  useEffect(() => {
    setCanSubmit(isValid)
  }, [isValid])

  const cryptos = watch('cryptos')
  const stocks = watch('stocks')

  const addCrypto = (crypto: TAsset) => setValue('cryptos', [...cryptos, crypto])
  const addStock = (stock: TAsset) => setValue('stocks', [...stocks, stock])

  const removeCrypto = (crypto: TAsset) =>
    setValue('cryptos', cryptos.filter(crypto2 => crypto.id !== crypto2.id))
  const removeStock = (stock: TAsset) =>
    setValue('stocks', stocks.filter(stock2 => stock.id !== stock2.id))

  const onSubmit: SubmitHandler<TCreateWatchlistFields> = async values => {
    const result = await createWatchlist.mutateAsync({
      ...values,
      cryptos: values.cryptos.map(crypto => crypto.id),
      stocks: values.stocks.map(stock => stock.id)
    })

    if (result.ok) {
      onCreate(result.val.data.watchlist.id)
    } else {
      console.log({ err: result.val })
      displayErrors(result.val.errors)
    }
  }

  const displayErrors = (errors: TCreateWatchlistFailure['errors']) => {
    entries<TCreateWatchlistFailure['errors']>(errors).forEach(entry => {
      const [key, messages] = entry!
      setError(key, { type: 'custom', message: messages![0] })
    })
  }

  return (
    <form id='create-watchlist-form' className="w-full" onSubmit={handleSubmit(onSubmit)}>
      <GeneralData
        name={register('name')}
        description={register('description')}
        errors={errors}
      />
      <SelectAssets
        assets={cryptos}
        assetKind="crypto"
        onSelect={addCrypto}
        onRemove={removeCrypto}
      />
      <SelectAssets
        assets={stocks}
        assetKind="stock"
        onSelect={addStock}
        onRemove={removeStock}
      />
    </form>
  )
}

export default CreateWatchlistForm
