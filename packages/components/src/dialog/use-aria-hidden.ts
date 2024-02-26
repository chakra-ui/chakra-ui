import { hideOthers } from "aria-hidden"
import { useEffect, useId, useMemo } from "react"

export function useAriaHidden(
  ref: React.RefObject<HTMLElement>,
  shouldHide: boolean,
) {
  // save current ref in a local var to trigger the effect on identity change
  const currentElement = ref.current

  useEffect(() => {
    // keep using `ref.current` inside the effect
    // it may have changed during render and the execution of the effect
    if (!ref.current || !shouldHide) return undefined

    return hideOthers(ref.current)
  }, [shouldHide, ref, currentElement])
}
export function useIds(idProp?: string, ...prefixes: string[]) {
  const reactId = useId()
  const id = idProp || reactId
  return useMemo(() => {
    return prefixes.map((prefix) => `${prefix}-${id}`)
  }, [id, prefixes])
}
