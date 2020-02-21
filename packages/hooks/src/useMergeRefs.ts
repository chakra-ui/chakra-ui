import * as React from "react"

type ReactRef<T> = React.Ref<T> | React.RefObject<T> | React.MutableRefObject<T>

export function assignRef<T = any>(ref: ReactRef<T>, value: T) {
  if (ref == null) return
  if (typeof ref === "function") {
    ref(value)
  } else {
    try {
      ;(ref as React.MutableRefObject<T>).current = value
    } catch (error) {
      throw new Error(`Cannot assign value "${value}" to ref "${ref}"`)
    }
  }
}

export function useMergeRefs<T>(...refs: (ReactRef<T> | undefined)[]) {
  return React.useMemo(() => {
    if (refs.every(ref => ref == null)) {
      return null
    }
    return (node: T) => {
      refs.forEach(ref => {
        if (ref) assignRef(ref, node)
      })
    }
  }, refs)
}

export default useMergeRefs
