type Dict = Record<string, any>
type PredicateFn<T> = (key: T) => boolean

export type SplitProps<T, K extends (keyof T)[]> = [
  Pick<T, K[number]>,
  Omit<T, K[number]>,
]

export function splitProps<T extends Dict, K extends keyof T>(
  props: T,
  keys: PredicateFn<K> | K[],
): SplitProps<T, K[]> {
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

  // @ts-expect-error
  const resKeys = Array.isArray(keys) ? keys : (dKeys.filter(keys) as K[])

  return split(resKeys as any).concat(split(dKeys))
}

export const createSplitProps = <T>(keys: (keyof T)[]) => {
  return function split<Props extends T>(
    props: Props,
  ): [T, Omit<Props, keyof T>] {
    // @ts-expect-error
    return splitProps(props, keys)
  }
}
