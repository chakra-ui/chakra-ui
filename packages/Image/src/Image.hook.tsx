import React from "react"
import { useIsomorphicEffect } from "@chakra-ui/hooks"

export type ImageHookProps = {
  src?: string
  srcSet?: string
  sizes?: string
  /**
   * A callback for when the image `src` has been loaded
   */
  onLoad?(event: Event): void
  /**
   * A callback for when there was an error loading the image `src`
   */
  onError?(error: string | Event): void
}

type Status = "loading" | "failed" | "pending" | "loaded"

export function useImage(props: ImageHookProps) {
  const { src, srcSet, onLoad, onError, sizes } = props

  const [status, setStatus] = React.useState<Status>(() => {
    return src ? "loading" : "pending"
  })

  const imageRef = React.useRef<HTMLImageElement | null>()

  const load = React.useCallback(() => {
    if (!src) return

    flush()

    const img = new Image()
    img.onload = event => {
      flush()
      setStatus("loaded")
      onLoad?.(event)
    }
    img.onerror = error => {
      flush()
      setStatus("failed")
      onError?.(error)
    }

    img.src = src

    if (srcSet) {
      img.srcset = srcSet
    }

    if (sizes) {
      img.sizes = sizes
    }

    imageRef.current = img
  }, [onError, onLoad, src, srcSet, sizes])

  const flush = () => {
    if (imageRef.current) {
      imageRef.current.onload = null
      imageRef.current.onerror = null
      imageRef.current = null
    }
  }

  useIsomorphicEffect(() => {
    if (status === "loading") {
      load()
    }
    return () => {
      flush()
    }
  }, [status, load])

  return status
}
