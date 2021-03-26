import format from "date-fns/format"

export const dayLabelFormatFn = (date: Date) => format(date, "dd")
export const weekdayLabelFormatFn = (date: Date) => format(date, "eeeeee")
export const monthLabelFormatFn = (date: Date) => format(date, "MMMM yyyy")
