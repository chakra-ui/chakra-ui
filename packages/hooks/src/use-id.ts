import * as React from "react"
import { useSafeLayoutEffect } from "./use-safe-layout-effect"

/**
 * Credit: https://github.com/reach/reach-ui/blob/develop/packages/auto-id/src/index.tsx
 */
let handoffComplete = false
let id = 0
const genId = () => ++id

/**
 * Reack hook to generate unique id
 *
 * @param idProp the external id passed from the user
 * @param prefix prefix to append before the id
 */
export function useId(idProp?: string, prefix?: string) {
  const initialId = idProp || (handoffComplete ? genId() : null)
  const [uid, setUid] = React.useState(initialId)

  useSafeLayoutEffect(() => {
    if (uid === null) setUid(genId())
  }, [])

  React.useEffect(() => {
    if (handoffComplete === false) {
      handoffComplete = true
    }
  }, [])

  const id = uid != null ? uid.toString() : undefined
  return (prefix ? `${prefix}-${id}` : id) as string
}

/**
 * Reack hook to generate ids for use in compound components
 *
 * @param idProp the external id passed from the user
 * @param prefixes array of prefixes to use
 *
 * @example
 *
 * ```js
 * const [buttonId, menuId] = useIds("52", "button", "menu")
 *
 * // buttonId will be `button-52`
 * // menuId will be `menu-52`
 * ```
 */
export function useIds(idProp?: string, ...prefixes: string[]) {
  const id = useId(idProp)
  return prefixes.map((prefix) => `${prefix}-${id}`)
}
