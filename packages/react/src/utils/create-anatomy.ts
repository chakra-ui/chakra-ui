export interface AnatomyPart {
  selector: string
  attrs: Record<"data-scope" | "data-part", string>
}

export type AnatomyInstance<T extends string> = Omit<Anatomy<T>, "parts">

export type AnatomyPartName<T> = T extends AnatomyInstance<infer U> ? U : never

export interface Anatomy<T extends string> {
  parts: <U extends string>(...parts: U[]) => AnatomyInstance<U>
  extendWith: <V extends string>(...parts: V[]) => AnatomyInstance<T | V>
  build: () => Record<T, AnatomyPart>
  rename: (newName: string) => Anatomy<T>
  keys: () => T[]
}

export const createAnatomy = <T extends string>(
  name: string,
  parts = [] as T[],
): Anatomy<T> => ({
  parts: (...values) => {
    if (isEmpty(parts)) {
      return createAnatomy(name, values)
    }
    throw new Error(
      "createAnatomy().parts(...) should only be called once. Did you mean to use .extendWith(...) ?",
    )
  },
  extendWith: (...values) => createAnatomy(name, [...parts, ...values]),
  rename: (newName) => createAnatomy(newName, parts),
  keys: () => parts,
  build: () =>
    [...new Set(parts)].reduce<Record<string, AnatomyPart>>(
      (prev, part) =>
        Object.assign(prev, {
          [part]: {
            selector: [
              `&[data-scope="${toKebabCase(name)}"][data-part="${toKebabCase(part)}"]`,
              `& [data-scope="${toKebabCase(name)}"][data-part="${toKebabCase(part)}"]`,
            ].join(", "),
            attrs: {
              "data-scope": toKebabCase(name),
              "data-part": toKebabCase(part),
            },
          },
        }),
      {},
    ),
})

const toKebabCase = (value: string) =>
  value
    .replace(/([A-Z])([A-Z])/g, "$1-$2")
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/[\s_]+/g, "-")
    .toLowerCase()

const isEmpty = <T>(v: T[]): boolean => v.length === 0
