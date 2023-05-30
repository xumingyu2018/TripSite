import dayjs from 'dayjs'

// 格式化日期（MM月DD日）
export function formatMonthDay(date, formatStr = "MM月DD日"){
  return dayjs(date).format(formatStr)
}

// 2个时间相隔的天数
export function getDiffDays(startDate, endDate){
  return dayjs(endDate).diff(startDate, "day")
}