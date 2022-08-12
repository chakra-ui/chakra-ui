export function compact<T extends Record<any, any>>(object: T) {
  const clone = Object.assign({}, object)
  for (let key in clone) {
    if (clone[key] === undefined) delete clone[key]
  }
  return clone
}

export function omit<T extends Record<any, any>>(
  object: T,
  keysToOmit: string[] = [],
) {
  const clone = Object.assign({}, object)
  for (let key of keysToOmit) {
    if (key in clone) delete clone[key]
  }
  return clone
}

export function pick<T extends Record<any, any>, K extends keyof T>(
  object: T,
  keysToPick: K[],
) {
  const result = {} as { [P in K]: T[P] }
  for (const key of keysToPick) {
    if (key in object) {
      result[key] = object[key]
    }
  }
  return result
}
