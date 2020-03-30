import { useSafeLayoutEffect } from "@chakra-ui/hooks"
import { useCallback, useRef, useState } from "react"

export type ImageHookProps = {
  /**
   * The image `src` attribute
   */
  src?: string
  /**
   * The image `srcset` attribute
   */
  srcSet?: string
  /**
   * The image `sizes` attribute
   */
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

/**
 * React hook that loads an image in the browser,
 * and let's us know the `status` so we can show image
 * fallback if it's still `pending`
 *
 * @returns the status of the image loading progress
 *
 * @example
 * ```jsx
 * function App(){
 *   const status = useImage({ src: "image.png" })
 *   return status === "loaded" ? <img src="image.png" /> : <Placeholder />
 * }
 * ```
 */
export function useImage(props: ImageHookProps) {
  const { src, srcSet, onLoad, onError, sizes } = props

  const [status, setStatus] = useState<Status>(() => {
    return src ? "loading" : "pending"
  })

  const imageRef = useRef<HTMLImageElement | null>()

  const load = useCallback(() => {
    if (!src) return

    flush()

    const img = new Image()

    img.src = src

    if (srcSet) {
      img.srcset = srcSet
    }

    if (sizes) {
      img.sizes = sizes
    }

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

    imageRef.current = img
  }, [onError, onLoad, src, srcSet, sizes])

  const flush = () => {
    if (imageRef.current) {
      imageRef.current.onload = null
      imageRef.current.onerror = null
      imageRef.current = null
    }
  }

  useSafeLayoutEffect(() => {
    if (status === "loading") {
      load()
    }
    return () => {
      flush()
    }
  }, [status, load])

  return status
}
