export interface AnatomyPart {
  selector: string
  className: string
  toString(): string
}

export type AnatomyInstance<T extends string> = Omit<Anatomy<T>, "parts">

export type AnatomyPartName<T> = T extends AnatomyInstance<infer U> ? U : never

export interface Anatomy<T extends string> {
  toPart: (part: string) => AnatomyPart
  parts: <U extends string>(...parts: U[]) => AnatomyInstance<U>
  extend: <V extends string>(...parts: V[]) => AnatomyInstance<T | V>
  readonly keys: T[]
  selectors: () => Record<T, string>
  classnames: () => Record<T, string>
  __type: T
}

/**
 * Used to define the anatomy/parts of a component in a way that provides
 * a consistent API for `className`, css selector and `theming`.
 */
export function anatomy<T extends string = string>(
  name: string,
  map = {} as any,
): Anatomy<T> {
  let called = false

  /**
   * Prevents user from calling `.parts` multiple times.
   * It should only be called once.
   */
  function assert() {
    if (!called) {
      called = true
      return
    }

    throw new Error(
      "[anatomy] .part(...) should only be called once. Did you mean to use .extend(...) ?",
    )
  }

  /**
   * Add the core parts of the components
   */
  function parts<V extends string>(...values: V[]) {
    assert()
    for (const part of values) {
      map[part] = toPart(part)
    }
    return anatomy(name, map) as unknown as Omit<Anatomy<V>, "parts">
  }

  /**
   * Extend the component anatomy to includes new parts
   */
  function extend<U extends string>(...parts: U[]) {
    for (const part of parts) {
      if (part in map) continue
      map[part] = toPart(part)
    }
    return anatomy(name, map) as unknown as Omit<Anatomy<T | U>, "parts">
  }

  /**
   * Get all selectors for the component anatomy
   */
  function selectors() {
    const value = Object.fromEntries(
      Object.entries(map).map(([key, part]) => [key, (part as any).selector]),
    )
    return value as Record<T, string>
  }

  /**
   * Get all classNames for the component anatomy
   */
  function classnames() {
    const value = Object.fromEntries(
      Object.entries(map).map(([key, part]) => [key, (part as any).className]),
    )
    return value as Record<T, string>
  }

  /**
   * Creates the part object for the given part
   */
  function toPart(part: string) {
    const el = ["container", "root"].includes(part ?? "")
      ? [name]
      : [name, part]
    const attr = el.filter(Boolean).join("__")
    const className = `chakra-${attr}`

    const partObj = {
      className,
      selector: `.${className}`,
      toString: () => part,
    }

    return partObj as typeof partObj & string
  }

  /**
   * Used to get the derived type of the anatomy
   */
  const __type = {} as T

  return {
    parts,
    toPart,
    extend,
    selectors,
    classnames,
    get keys(): T[] {
      return Object.keys(map) as T[]
    },
    __type,
  }
}
