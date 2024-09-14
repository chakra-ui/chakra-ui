import { callAll } from "./utils"

interface Props {
  [key: string]: any
}

const clsx = (...args: (string | undefined)[]) =>
  args
    .map((str) => str?.trim?.())
    .filter(Boolean)
    .join(" ")

type TupleTypes<T extends any[]> = T[number]

type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (
  k: infer I,
) => void
  ? I
  : never

const eventRegex = /^on[A-Z]/

export function mergeProps<T extends Props>(
  ...args: T[]
): UnionToIntersection<TupleTypes<T[]>> {
  let result: Props = {}

  for (let props of args) {
    for (let key in result) {
      if (
        eventRegex.test(key) &&
        typeof result[key] === "function" &&
        typeof props[key] === "function"
      ) {
        result[key] = callAll(result[key], props[key])
        continue
      }

      if (key === "className" || key === "class") {
        result[key] = clsx(result[key], props[key])
        continue
      }

      if (key === "style") {
        result[key] = Object.assign({}, result[key] ?? {}, props[key] ?? {})
        continue
      }

      result[key] = props[key] !== undefined ? props[key] : result[key]
    }

    // Add props from b that are not in a
    for (let key in props) {
      if (result[key] === undefined) {
        result[key] = props[key]
      }
    }
  }

  return result as any
}
