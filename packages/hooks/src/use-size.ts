import { trackElementSize, ElementSize } from "@zag-js/element-size"
import { useEffect, useLayoutEffect, useState } from "react"

const useSafeLayoutEffect = Boolean(globalThis?.document)
  ? useLayoutEffect
  : useEffect

function trackMutation(el: HTMLElement | null, cb: () => void) {
  if (!el || !el.parentElement) return
  const win = el.ownerDocument?.defaultView ?? window
  const observer = new win.MutationObserver(() => {
    cb()
  })
  observer.observe(el.parentElement, { childList: true })
  return () => {
    observer.disconnect()
  }
}

export interface UseSizesProps<T> {
  getNodes: () => T[]
  observeMutation?: boolean
  enabled?: boolean
  fallback?: ElementSize[]
}

export function useSizes<T extends HTMLElement | null>(
  props: UseSizesProps<T>,
) {
  const {
    getNodes,
    observeMutation = true,
    enabled = true,
    fallback = [],
  } = props

  const [sizes, setSizes] = useState<ElementSize[]>(fallback)
  const [count, setCount] = useState(0)

  useSafeLayoutEffect(() => {
    if (!enabled) return

    const elements = getNodes()

    const cleanups = elements.map((element, index) =>
      trackElementSize(element, (size) => {
        setSizes((sizes) => {
          return [
            ...sizes.slice(0, index),
            size,
            ...sizes.slice(index + 1),
          ] as ElementSize[]
        })
      }),
    )

    if (observeMutation) {
      const firstNode = elements[0]
      cleanups.push(
        trackMutation(firstNode, () => {
          setCount((count) => count + 1)
        }),
      )
    }

    return () => {
      cleanups.forEach((cleanup) => {
        cleanup?.()
      })
    }
  }, [count, enabled])

  return sizes as Array<ElementSize | undefined>
}

function isRef(ref: any): ref is React.RefObject<any> {
  return typeof ref === "object" && ref !== null && "current" in ref
}

export interface UseSizeProps {
  observeMutation?: boolean
  enabled?: boolean
  fallback?: ElementSize
}

export function useSize<T extends HTMLElement | null>(
  subject: T | React.RefObject<T>,
  options?: UseSizeProps,
) {
  const { observeMutation = false, enabled, fallback } = options ?? {}

  const [size] = useSizes({
    observeMutation,
    enabled,
    fallback: fallback ? [fallback] : undefined,
    getNodes() {
      const node = isRef(subject) ? subject.current : subject
      return [node]
    },
  })

  return size as ElementSize | undefined
}
