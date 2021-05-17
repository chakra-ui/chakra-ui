import throttle from "lodash.throttle"
import React from "react"

type Dimensions = {
  width: number | null
  height: number | null
  offsetX: number | null
  offsetY: number | null
}

export function useThrottledResize(
  ref: React.RefObject<HTMLElement>,
  delay?: 500,
) {
  const [dimensions, setDimensions] = React.useState<Dimensions>({
    width: null,
    height: null,
    offsetX: null,
    offsetY: null,
  })
  const rafId = React.useRef<number>()

  React.useEffect(() => {
    if (!ref.current) return

    const node = ref.current

    function measure() {
      rafId.current = requestAnimationFrame(() => {
        setDimensions({
          width: node.offsetWidth,
          height: node.offsetHeight,
          offsetX: node.offsetLeft,
          offsetY: node.offsetTop,
        })
      })
    }

    const throttledMeasure = throttle(measure, delay)

    window.addEventListener("resize", throttledMeasure)

    return () => {
      if (rafId.current) {
        cancelAnimationFrame(rafId.current)
      }
      window.removeEventListener("resize", throttledMeasure)
    }
  }, [ref, delay])

  return dimensions
}

export function getDistance(a: DOMRect, b: DOMRect) {
  if (a && b) {
    return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2))
  }
}
