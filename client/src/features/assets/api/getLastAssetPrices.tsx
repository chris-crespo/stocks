import { TId } from "~/types"
import { AssetKind } from "../types"

export const getLastAssetPrice = (kind: AssetKind, ids: TId[]) => {
  const queryParams = ids.map(id => `id[]=${id}`).join('&')
  return authd(`/api/${kind}s/price?${queryParams}`)
    .get()
}
