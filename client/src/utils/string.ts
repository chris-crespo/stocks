export const capitalize = (str: string) => str[0].toUpperCase() + str.slice(1)

type FormatNumberOptions = {
  minimumDigits?: number
}

export const formatNumber = (x: number, {
  minimumDigits = 2 
}: FormatNumberOptions = {}) => {
  return x.toLocaleString('en-US', {
    minimumIntegerDigits: minimumDigits
  })
}
