export function truncateMiddle(str: string, maxLength: number): string {
  if (typeof str !== "string" || str.length <= maxLength || maxLength <= 3) {
    return str
  }
  const charsToShow = Math.ceil((maxLength - 3) / 2)
  const backChars = Math.floor((maxLength - 3) / 2)
  return `${str.slice(0, charsToShow)}...${str.slice(str.length - backChars)}`
}
