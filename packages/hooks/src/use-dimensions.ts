import * as React from "react"
import { getBox, BoxModel } from "@chakra-ui/utils"
import { useSafeLayoutEffect } from "./use-safe-layout-effect"

/**
 * Reack hook to measure a component's dimensions
 *
 * @param ref ref of the component to measure
 * @param observe if `true`, resize and scroll observers will be turned on
 */
export function useDimensions(
  ref: React.RefObject<HTMLElement>,
  observe?: boolean,
) {
  const [dimensions, setDimensions] = React.useState<BoxModel | null>(null)
  const rafId = React.useRef<number>()

  useSafeLayoutEffect(() => {
    if (!ref.current) return

    const node = ref.current

    function measure() {
      rafId.current = requestAnimationFrame(() => {
        const boxModel = getBox(node)
        setDimensions(boxModel)
      })
    }

    measure()

    if (observe) {
      window.addEventListener("resize", measure)
      window.addEventListener("scroll", measure)

      return () => {
        if (rafId.current) {
          cancelAnimationFrame(rafId.current)
        }
        window.removeEventListener("resize", measure)
        window.removeEventListener("scroll", measure)
      }
    }

    return () => {
      if (rafId.current) {
        cancelAnimationFrame(rafId.current)
      }
    }
  }, [ref, observe])

  return dimensions
}
