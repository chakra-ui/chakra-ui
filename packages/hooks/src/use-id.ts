import { useCallback, useId as useReactId, useMemo, useState } from "react"

export function useId(idProp: string | undefined, prefix?: string | undefined) {
  const id = useReactId()
  return useMemo(
    () => idProp || [prefix, id].filter(Boolean).join("-"),
    [idProp, prefix, id],
  )
}

export function useIds(idProp: string | undefined, ...prefixes: string[]) {
  const id = useId(idProp)
  return useMemo(() => {
    return prefixes.map((prefix) => `${prefix}-${id}`)
  }, [id, prefixes])
}

export function useOptionalPart<T>(partId: string) {
  const [id, setId] = useState<string | null>(null)
  const ref = useCallback(
    (node: T) => {
      setId(node ? partId : null)
    },
    [partId],
  )
  return { ref, id, isRendered: Boolean(id) }
}
