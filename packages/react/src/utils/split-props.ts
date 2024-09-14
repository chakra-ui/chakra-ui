import type { Dict } from "./types"

type PredicateFn<T> = (key: T) => boolean

export interface SplitPropsFn {
  <T extends Dict, K extends keyof T>(
    props: T,
    keys: K[],
  ): [Pick<T, K>, Omit<T, K>]

  <T extends Dict, K extends PredicateFn<keyof T>>(
    props: T,
    keys: K,
  ): [Dict, Dict]
}

export const splitProps: SplitPropsFn = (props: any, keys: any[]) => {
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
  const fn = (key: any) => split(Array.isArray(key) ? key : dKeys.filter(key))
  return [keys].map(fn).concat(split(dKeys)) as any
}

export const createSplitProps = <T>(keys: (keyof T)[]) => {
  return function split<Props extends Partial<T>>(
    props: Props,
  ): [T, Omit<Props, keyof T>] {
    // @ts-expect-error
    return splitProps(props, keys)
  }
}
