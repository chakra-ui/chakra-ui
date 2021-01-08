import * as React from "react"

let id = 0

function genId() {
  id += 1
  return id
}

/**
 * Reack hook to generate unique id
 *
 * @param idProp the external id passed from the user
 * @param prefix prefix to append before the id
 */
export function useId(idProp?: string, prefix?: string) {
  const [uuid] = React.useState(() => genId())
  const id = idProp ?? uuid
  return prefix ? `${prefix}-${id}` : id
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
