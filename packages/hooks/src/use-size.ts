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

export function useSizes<T extends HTMLElement | null>({
  getNodes,
  observeMutation = true,
}: {
  getNodes: () => T[]
  observeMutation?: boolean
}) {
  const [sizes, setSizes] = useState<ElementSize[]>([])
  const [count, setCount] = useState(0)

  useSafeLayoutEffect(() => {
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
  }, [count])

  return sizes as Array<ElementSize | undefined>
}

function isRef(ref: any): ref is React.RefObject<any> {
  return typeof ref === "object" && ref !== null && "current" in ref
}

export function useSize<T extends HTMLElement | null>(
  subject: T | React.RefObject<T>,
) {
  const [size] = useSizes({
    observeMutation: false,
    getNodes() {
      const node = isRef(subject) ? subject.current : subject
      return [node]
    },
  })
  return size as ElementSize | undefined
}
