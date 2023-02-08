export const getCurrentHour = () => new Date().getHours()

export const parseTime = (str: string) => {
  const date = new Date(str).toLocaleTimeString('en-us', { hour12: false })
  return date.slice(0, 5)
}
