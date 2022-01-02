// This implementation is heavily inspired by react-aria's implementation

import * as React from "react"

type IdContextValue = {
  current: number
}

const defaultIdContext: IdContextValue = {
  current: 1,
}

const IdContext = React.createContext<IdContextValue>(defaultIdContext)

export const IdProvider: React.FC = React.memo(({ children }) => {
  return React.createElement(
    IdContext.Provider,
    { value: { current: 1 } },
    children,
  )
})

const genId = (context: IdContextValue) => context.current++

export function useId(idProp?: string, prefix?: string): string {
  const context = React.useContext(IdContext)
  /*
      We get the current id by context and generate a new id inside useEffect so that the side effects occur during the commit phase,
      Doing this prevents the side effects from being called twice when used with strict mode (render() in function component is the function body), which ends up making the server with the client not synchronized
  */
  const [id, setId] = React.useState(context.current)

  React.useEffect(() => {
    setId(genId(context))
  }, [context])

  return React.useMemo(() => idProp || [prefix, id].filter(Boolean).join("-"), [
    idProp,
    prefix,
    id,
  ])
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
