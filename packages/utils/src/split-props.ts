type Dict = Record<string, any>
type PredicateFn = (key: string) => boolean
type Key = PredicateFn | string[]

export function splitProps<T extends Dict>(props: T, ...keys: Key[]) {
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

export const createSplitProps = <T>(keys: (keyof T)[]) => {
  return function split<Props extends T>(
    props: Props,
  ): [T, Omit<Props, keyof T>] {
    // @ts-expect-error
    return splitProps(props, keys)
  }
}
