"use client"

import { AbsoluteCenter, Box, type BoxProps, Spinner } from "@chakra-ui/react"
import { forwardRef, useEffect } from "react"

interface LoadingOverlayProps extends BoxProps {
  loading?: boolean
  containerRef?: React.RefObject<HTMLElement>
}

export const LoadingOverlay = forwardRef<HTMLDivElement, LoadingOverlayProps>(
  function LoadingOverlay(props, ref) {
    const { loading, containerRef, children, ...rest } = props

    useEffect(() => {
      if (!containerRef?.current) return
      if (loading) {
        containerRef.current.setAttribute("aria-busy", "true")
      } else {
        containerRef.current.removeAttribute("aria-busy")
      }
    }, [loading, containerRef])

    if (!loading) return null

    return (
      <AbsoluteCenter ref={ref}>
        <Box inset="0" pos="absolute" {...rest} />
        <Spinner size="lg" />
        {children}
      </AbsoluteCenter>
    )
  },
)
