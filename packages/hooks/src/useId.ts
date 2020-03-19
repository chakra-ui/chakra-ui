import { useUID } from "react-uid"

type Id = string | number

function generatePrefix(prefix: string, id: Id) {
  return `${prefix}-${id}`
}

/**
 * Reack hook to generate unique id
 *
 * @param idProp the external id passed from the user
 * @param prefix prefix to append before the id
 */
export function useId(idProp?: Id, prefix?: string) {
  const uuid = useUID()
  const id = idProp ?? uuid
  return prefix ? generatePrefix(prefix, id) : id
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
 * // buttonId will be `button-52`
 * // menuId will be `menu-52`
 * ```
 */
export function useIds(idProp?: Id, ...prefixes: string[]) {
  const id = useId(idProp)
  const ids = prefixes.map(prefix => generatePrefix(prefix, id))
  return ids
}
