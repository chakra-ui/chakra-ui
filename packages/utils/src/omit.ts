export function omit<T extends Record<string, any>, K extends keyof T>(
  object: T,
  keysToOmit: K[] | readonly K[] = [],
) {
  const clone: Record<string, unknown> = Object.assign({}, object)
  for (const key of keysToOmit) {
    if (key in clone) {
      delete clone[key as string]
    }
  }
  return clone as Omit<T, K>
}
