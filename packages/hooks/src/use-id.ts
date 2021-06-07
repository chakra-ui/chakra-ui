// This implementation is heavily inspired by react-aria's implementation

import * as React from "react"

type IdContextValue = {
  prefix: number
  current: number
}

const defaultIdContext: IdContextValue = {
  prefix: Math.round(Math.random() * 10000000000),
  current: 0,
}

const IdContext = React.createContext<IdContextValue>(defaultIdContext)

export const IdProvider: React.FC = React.memo(({ children }) => {
  const currentContext = React.useContext(IdContext)
  const isRoot = currentContext === defaultIdContext
  const context: IdContextValue = React.useMemo(
    () => ({
      prefix: isRoot ? 0 : ++currentContext.prefix,
      current: 0,
    }),
    [isRoot, currentContext],
  )

  return React.createElement(IdContext.Provider, { value: context }, children)
})

export function useId(idProp?: string, prefix?: string): string {
  const context = React.useContext(IdContext)
  return React.useMemo(
    () =>
      idProp ||
      [prefix, context.prefix, ++context.current].filter(Boolean).join("-"),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [idProp, prefix],
  )
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
  return React.useMemo(() => {
    return prefixes.map((prefix) => `${prefix}-${id}`)
  }, [id, prefixes])
}

/**
 * Used to generate an id, and after render, check if that id is rendered so we know
 * if we can use it in places such as `aria-labelledby`.
 *
 * @param partId - The unique id for the component part
 *
 * @example
 * const { ref, id } = useOptionalPart<HTMLInputElement>(`${id}-label`)
 */
export function useOptionalPart<T = any>(partId: string) {
  const [id, setId] = React.useState<string | null>(null)
  const ref = React.useCallback(
    (node: T) => {
      setId(node ? partId : null)
    },
    [partId],
  )
  return { ref, id, isRendered: Boolean(id) }
}
