import { Lazy } from "./generator"

const minutesInADay = 1440
const msInAMinute = 60000
const msInADay = minutesInADay * msInAMinute

export const getCurrentDay = () => new Date().getDay()

export const substractDaysFromDate = (days: number, date: Date) => {
  const offset = msInADay * days
  return new Date(date.getTime() - offset)
}

export const substractDaysFromNow = (days: number) => {
  return substractDaysFromDate(days, new Date())
}

export const previousDay = (date: Date) => {
  return substractDaysFromDate(1, date)
}

export const isSameMonth = (a: Date, b: Date) => {
  return a.getMonth() == b.getMonth()
}

export const listDaysFromDate = (n: number, date: Date) => {
  return Lazy.unfold(date, previousDay).take(n).toList()
}

export const listDaysFromNow = (n: number) => {
  return listDaysFromDate(n, new Date())
}

export const parseShortWeekday = (str: string) => {
  const date = new Date(str)
  return getWeekday(date)
}

export const getWeekday = (date: Date) => {
  const timeString = date.toLocaleTimeString('en-us', { weekday: 'short' })
  const [weekday] = timeString.split(' ')
  return weekday
}

export const parseDay = (str: string) => {
  const date = new Date(str)
  return date.getDate()
}
