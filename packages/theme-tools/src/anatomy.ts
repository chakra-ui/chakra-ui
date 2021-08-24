/**
 * Used to define the anatomy/parts of a component in a way that provides
 * a consistent API for `className`, css selector and `theming`.
 */
export class Anatomy<T extends string = string> {
  private map: Record<T, Part> = {} as Record<T, Part>

  constructor(private name: string) {}

  public parts = <V extends string>(...values: V[]) => {
    for (const part of values) {
      ;(this.map as any)[part] = this.toPart(part)
    }
    return (this as unknown) as Anatomy<V>
  }

  public extend = <U extends string>(...parts: U[]) => {
    for (const part of parts) {
      if (part in this.map) continue
      ;(this.map as any)[part] = this.toPart(part)
    }
    return (this as unknown) as Anatomy<T | U>
  }

  get selectors() {
    const value = Object.fromEntries(
      Object.entries(this.map).map(([key, part]) => [
        key,
        (part as any).selector,
      ]),
    )
    return value as Record<T, string>
  }

  get keys() {
    return Object.keys(this.map) as T[]
  }

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
