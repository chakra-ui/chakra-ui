import { isString } from "./is"

export const cx = (...classNames: any[]) => {
  const classes: string[] = []
  for (let i = 0; i < classNames.length; i++) {
    const className = classNames[i]
    if (!isString(className)) continue
    const trimmed = className.trim()
    if (trimmed) classes.push(trimmed)
  }
  return classes.join(" ")
}
