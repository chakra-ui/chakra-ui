import { type WalkObjectStopFn, walkObject } from "./walk-object"

export function flatten(
  values: Record<string, Record<string, any>>,
  stop?: WalkObjectStopFn,
) {
  const result: Record<string, any> = {}

  walkObject(
    values,
    (token, paths) => {
      if (token) {
        result[paths.join(".")] = token.value
      }
    },
    { stop },
  )

  return result
}
