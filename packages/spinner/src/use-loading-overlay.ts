import { SystemProps } from "@chakra-ui/system"
import React, { RefObject, useState } from "react"

export interface UseLoadingOverlayProps {
  /**
   * Set appropriate aria attributes on the container element.
   * Will set `aria-live` and `aria-busy` to indicate the content is changing.
   */
  containerRef?: RefObject<HTMLElement>

  /**
   * Show or hide the LoadingOverlay.
   * @default true
   */
  isLoading?: boolean

  /**
   * The transition that should be used for the overlay
   * @default "fade"
   */
  motionPreset?: "none" | "fade"
}

export const useLoadingOverlay = (props: UseLoadingOverlayProps) => {
  const { containerRef, isLoading, motionPreset } = props

  const [animateInitial] = useState(!isLoading && motionPreset !== "none")

  React.useEffect(() => {
    if (!containerRef?.current) {
      return
    }
    containerRef.current.setAttribute("aria-live", "polite")
    containerRef.current.setAttribute("aria-busy", String(isLoading))
  }, [isLoading])

  return {
    animateInitial,
  }
}
