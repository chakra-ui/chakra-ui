import { useCallback, useId as useReactId, useMemo, useState } from "react"

export function useId(idProp?: string, prefix?: string): string {
  const id = useReactId()

  return useMemo(
    () => idProp || [prefix, id].filter(Boolean).join("-"),
    [idProp, prefix, id],
  )
}

/**
 * React hook to generate ids for use in compound components
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
  return useMemo(() => {
    return prefixes.map((prefix) => `${prefix}-${id}`)
  }, [id, prefixes])
}

/**
 * Used to generate an id, and after render, check if that id is rendered, so we know
 * if we can use it in places such as `aria-labelledby`.
 *
 * @param partId - The unique id for the component part
 *
 * @example
 * const { ref, id } = useOptionalPart<HTMLInputElement>(`${id}-label`)
 */
export function useOptionalPart<T = any>(partId: string) {
  const [id, setId] = useState<string | null>(null)
  const ref = useCallback(
    (node: T) => {
      setId(node ? partId : null)
    },
    [partId],
  )
  return { ref, id, isRendered: Boolean(id) }
}
