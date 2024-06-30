export function unionType(values: Iterable<any>) {
  return Array.from(values)
    .map((value) => JSON.stringify(value))
    .join(" | ")
}

export function capitalize(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1)
}

export const isBooleanValue = (value: string) =>
  value === "true" || value === "false"

export const uniq = <T>(arr: T[]) => Array.from(new Set(arr))
