import type { BreakpointEntry, SystemContext } from "./types"
import { toPx, toRem } from "./unit-conversion"

const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1)

export function createBreakpoints(
  breakpoints: Record<string, string>,
): SystemContext["breakpoints"] {
  const sorted = sort(breakpoints)
  const values = Object.fromEntries(sorted)

  function get(name: string) {
    return values[name]
  }

  function only(name: string) {
    return build(get(name))
  }

  function getRanges() {
    const breakpoints: string[] = Object.keys(values)
    const permuations = getPermutations(breakpoints)

    const results = breakpoints
      .flatMap((name) => {
        const value = get(name)

        const down: [string, string] = [
          `${name}Down`,
          build({ max: adjust(value.min) }),
        ]

        const up: [string, string] = [name, build({ min: value.min })]
        const _only: [string, string] = [`${name}Only`, only(name)]

        return [up, _only, down]
      })
      .filter(([, value]) => value !== "")
      .concat(
        permuations.map(([min, max]) => {
          const minValue = get(min)
          const maxValue = get(max)
          return [
            `${min}To${capitalize(max)}`,
            build({ min: minValue.min, max: adjust(maxValue.min) }),
          ]
        }),
      )

    return Object.fromEntries(results)
  }

  function toConditions() {
    const ranges = getRanges()
    return Object.fromEntries(Object.entries(ranges))
  }

  const conditions = toConditions()

  const getCondition = (key: string) => {
    return conditions[key]
  }

  function keys() {
    return ["base", ...Object.keys(values)]
  }

  function up(name: string) {
    return build({ min: get(name).min })
  }

  function down(name: string) {
    return build({ max: adjust(get(name).min) })
  }

  return {
    values: Object.values(values),
    only,
    keys,
    conditions,
    getCondition,
    up,
    down,
  }
}

type Entries = [string, BreakpointEntry][]

function adjust(value: string | null | undefined) {
  const computedMax = parseFloat(toPx(value!) ?? "") - 0.04
  return toRem(`${computedMax}px`) as string
}

function sort(breakpoints: Record<string, string>): Entries {
  const entries = Object.entries(breakpoints).sort(([, minA], [, minB]) => {
    return parseInt(minA, 10) < parseInt(minB, 10) ? -1 : 1
  })

  return entries.map(([name, min], index, entries) => {
    let max: string | null = null

    if (index <= entries.length - 1) {
      max = entries[index + 1]?.[1]
    }

    if (max != null) {
      max = adjust(max)
    }

    return [name, { name, min: toRem(min), max }]
  })
}

function getPermutations(values: string[]) {
  const result: [string, string][] = []

  values.forEach((current, index) => {
    let idx = index
    idx++
    let next = values[idx]

    while (next) {
      result.push([current, next])
      idx++
      next = values[idx]
    }
  })

  return result
}

function build({ min, max }: { min?: string | null; max?: string | null }) {
  if (min == null && max == null) return ""
  return [
    "@media screen",
    min && `(min-width: ${min})`,
    max && `(max-width: ${max})`,
  ]
    .filter(Boolean)
    .join(" and ")
}
