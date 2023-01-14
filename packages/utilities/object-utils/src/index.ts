export function compact<T extends Record<any, any>>(object: T) {
  const clone = Object.assign({}, object)
  for (let key in clone) {
    if (clone[key] === undefined) delete clone[key]
  }
  return clone
}

export function omit<T extends Record<string, any>, K extends keyof T>(
  object: T,
  keysToOmit: K[] = [],
) {
  const clone: Record<string, unknown> = Object.assign({}, object)
  for (const key of keysToOmit) {
    if (key in clone) {
      delete clone[key as string]
    }
  }
  return clone as Omit<T, K>
}

export function pick<T extends Record<string, any>, K extends keyof T>(
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

export function split<T extends Record<string, any>, K extends keyof T>(
  object: T,
  keys: K[],
) {
  const picked: Record<string, any> = {}
  const omitted: Record<string, any> = {}

  for (const [key, value] of Object.entries(object)) {
    if (keys.includes(key as T[K])) picked[key] = value
    else omitted[key] = value
  }

  return [picked, omitted] as [{ [P in K]: T[P] }, Omit<T, K>]
}

export function assignAfter(target: Record<string, any>, ...sources: any[]) {
  if (target == null) {
    // TypeError if undefined or null
    throw new TypeError("Cannot convert undefined or null to object")
  }

  const result: Record<string, unknown> = { ...target }
  for (const nextSource of sources) {
    if (nextSource == null) continue // Skip over if undefined or null
    for (const nextKey in nextSource) {
      if (!Object.prototype.hasOwnProperty.call(nextSource, nextKey)) continue
      if (nextKey in result) delete result[nextKey]
      result[nextKey] = nextSource[nextKey]
    }
  }

  return result
}
