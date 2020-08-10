import { callAllHandlers } from "./function"
import { cx } from "./dom"
import { isFunction, isString } from "./assertion"

interface Props {
  [key: string]: any
}

type TupleTypes<T> = { [P in keyof T]: T[P] } extends { [key: number]: infer V }
  ? V
  : never

type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (
  k: infer I,
) => void
  ? I
  : never

export function mergeProps<T extends Props[]>(
  ...args: T
): UnionToIntersection<TupleTypes<T>> {
  const result: Props = {}
  for (const props of args) {
    for (const key in result) {
      // Chain events
      if (
        /^on[A-Z]/.test(key) &&
        isFunction(result[key]) &&
        isFunction(props[key])
      ) {
        result[key] = callAllHandlers(result[key], props[key])
        // Merge classnames, sometimes classNames are empty string which eval to false, so we just need to do a type check
      } else if (
        key === "className" &&
        isString(result.className) &&
        isString(props.className)
      ) {
        result[key] = cx(result.className, props.className)
      } else if (key === "id" && result.id && props.id) {
        result.id = cx(result.id, props.id)
        // Override others
      } else {
        result[key] = props[key] !== undefined ? props[key] : result[key]
      }
    }

    // Add props from b that are not in a
    for (const key in props) {
      if (result[key] === undefined) {
        result[key] = props[key]
      }
    }
  }

  return result as UnionToIntersection<TupleTypes<T>>
}
