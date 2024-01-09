type Dict = Record<string, unknown>
type PredicateFn = (key: string) => boolean
type Key = PredicateFn | string[]

export function splitProps(props: Dict, ...keys: Key[]) {
  const descriptors = Object.getOwnPropertyDescriptors(props)
  const dKeys = Object.keys(descriptors)
  const split = (k: string[]) => {
    const clone = {} as Dict
    for (let i = 0; i < k.length; i++) {
      const key = k[i]
      if (descriptors[key]) {
        Object.defineProperty(clone, key, descriptors[key])
        delete descriptors[key]
      }
    }
    return clone
  }
  const fn = (key: Key) => split(Array.isArray(key) ? key : dKeys.filter(key))
  return keys.map(fn).concat(split(dKeys))
}
