export function pick<T extends Record<string, any>, K extends keyof T>(
  object: T,
  keysToPick: K[],
) {
  const result = {} as {
    [P in K]: T[P]
  }
  for (const key of keysToPick) {
    if (key in object) {
      result[key] = object[key]
    }
  }
  return result
}
