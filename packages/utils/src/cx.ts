export const cx = (...classNames: any[]) =>
  classNames
    .filter(Boolean)
    .map((r) => r.trim())
    .join(" ")
