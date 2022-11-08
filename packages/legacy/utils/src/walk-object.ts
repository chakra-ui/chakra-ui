import { isArray, isObject } from "./assertion"
import { fromEntries } from "./object"

export type WalkObjectPredicate<Leaf = unknown> = (
  value: unknown,
  path: string[],
) => Leaf

export type MappedLeavesObject<Obj, LeafType> = {
  [Prop in keyof Obj]: Obj[Prop] extends Array<any>
    ? MappedLeavesObject<Obj[Prop][number], LeafType>[]
    : Obj[Prop] extends object
    ? MappedLeavesObject<Obj[Prop], LeafType>
    : LeafType
}

export function walkObject<Target, LeafType>(
  target: Target,
  predicate: WalkObjectPredicate<LeafType>,
): MappedLeavesObject<Target, ReturnType<WalkObjectPredicate<LeafType>>> {
  function inner(value: unknown, path: string[] = []): any {
    if (isArray(value)) {
      return value.map((item, index) => inner(item, [...path, String(index)]))
    }

    if (isObject(value)) {
      return fromEntries(
        Object.entries(value).map(([key, child]) => [
          key,
          inner(child, [...path, key]),
        ]),
      )
    }

    return predicate(value, path)
  }

  return inner(target)
}
