import { trackElementSize } from "@zag-js/element-size"
import { useEffect, useLayoutEffect, useState } from "react"

type Size = {
  width: number
  height: number
}

const useSafeLayoutEffect = Boolean(globalThis?.document)
  ? useLayoutEffect
  : useEffect

export function useSize<T extends HTMLElement>(ref: React.RefObject<T | null>) {
  const [size, setSize] = useState<Size>()
  useSafeLayoutEffect(() => {
    return trackElementSize(ref.current, (size) => {
      setSize(size)
    })
  }, [])
  return size
}
