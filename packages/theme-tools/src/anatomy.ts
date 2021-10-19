import { fromEntries } from "@chakra-ui/utils"
/**
 * Used to define the anatomy/parts of a component in a way that provides
 * a consistent API for `className`, css selector and `theming`.
 */
export class Anatomy<T extends string = string> {
  private map: Record<T, Part> = {} as Record<T, Part>
  private called = false

  constructor(private name: string) {}

  /**
   * Prevents user from calling `.parts` multiple times.
   * It should only be called once.
   */
  private assert = () => {
    if (!this.called) {
      this.called = true
      return
    }

    throw new Error(
      "[anatomy] .part(...) should only be called once. Did you mean to use .extend(...) ?",
    )
  }

  /**
   * Add the core parts of the components
   */
  public parts = <V extends string>(...values: V[]) => {
    this.assert()
    for (const part of values) {
      ;(this.map as any)[part] = this.toPart(part)
    }
    return (this as unknown) as Omit<Anatomy<V>, "parts">
  }

  /**
   * Extend the component anatomy to includes new parts
   */
  public extend = <U extends string>(...parts: U[]) => {
    for (const part of parts) {
      if (part in this.map) continue
      ;(this.map as any)[part] = this.toPart(part)
    }
    return (this as unknown) as Omit<Anatomy<T | U>, "parts">
  }

  /**
   * Get all selectors for the component anatomy
   */
  get selectors() {
    const value = fromEntries(
      Object.entries(this.map).map(([key, part]) => [
        key,
        (part as any).selector,
      ]),
    )
    return value as Record<T, string>
  }

  /**
   * Get all classNames for the component anatomy
   */
  get classNames() {
    const value = fromEntries(
      Object.entries(this.map).map(([key, part]) => [
        key,
        (part as any).className,
      ]),
    )
    return value as Record<T, string>
  }

  /**
   * Get all parts as array of string
   */
  get keys() {
    return Object.keys(this.map) as T[]
  }

  /**
   * Creates the part object for the given part
   */
  toPart = (part: string) => {
    const el = ["container", "root"].includes(part ?? "")
      ? [this.name]
      : [this.name, part]
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
  __type = {} as T
}

type Part = {
  className: string
  selector: string
  toString: () => string
}

export function anatomy(name: string) {
  return new Anatomy(name)
}
