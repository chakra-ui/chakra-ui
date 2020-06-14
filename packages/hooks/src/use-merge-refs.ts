/* eslint-disable react-hooks/exhaustive-deps */
import * as React from "react"

type ReactRef<T> = React.Ref<T> | React.MutableRefObject<T>

const isRefFunction = (ref: any): ref is <T>(instance: T) => void =>
  typeof ref === "function"

const isRefObject = (ref: any): ref is React.MutableRefObject<any> =>
  Boolean(ref.current)

export function assignRef<T = any>(ref: ReactRef<T>, value: T) {
  if (ref == null) return

  if (isRefFunction(ref)) {
    ref(value)
    return
  }

  if (isRefObject(ref)) {
    //@ts-ignore
    ref.current = value
    return
  }

  throw new Error(`Cannot assign value "${value}" to ref "${ref}"`)
}

/**
 * React hook that merges react refs into a single memoized function
 *
 * @example
 * import React from "react";
 * import { useMergeRefs } from `@chakra-ui/hooks`;
 *
 * const Component = React.forwardRef((props, ref) => {
 *   const internalRef = React.useRef();
 *   return <div {...props} ref={useMergeRefs(internalRef, ref)} />;
 * });
 */
export function useMergeRefs<T>(...refs: (ReactRef<T> | undefined)[]) {
  return React.useMemo(() => {
    if (refs.every((ref) => ref == null)) {
      return null
    }
    return (node: T) => {
      refs.forEach((ref) => {
        if (ref) assignRef(ref, node)
      })
    }
  }, refs)
}
