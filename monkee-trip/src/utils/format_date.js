import dayjs from 'dayjs'

export function formatMonthDay(date, formatStr = "MM月DD日"){
  return dayjs(date).format(formateStr)
}

export function getDiffDays(startDate, endDate){
  return dayjs(startDate).diff(startDate, "day")
}