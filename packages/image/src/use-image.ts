import { useSafeLayoutEffect } from "@chakra-ui/hooks"
import { isBrowser } from "@chakra-ui/utils"
import {
  useState,
  useRef,
  useEffect,
  useCallback,
  ImgHTMLAttributes,
} from "react"

export type UseImageProps = {
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
  /**
   * If `true`, opt out of the `fallbackSrc` logic and use as `img`
   */
  ignoreFallback?: boolean
  /**
   * The key used to set the crossOrigin on the HTMLImageElement into which the image will be loaded.
   * This tells the browser to request cross-origin access when trying to download the image data.
   */
  crossOrigin?: ImgHTMLAttributes<any>["crossOrigin"]
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
 *
 * ```jsx
 * function App(){
 *   const status = useImage({ src: "image.png" })
 *   return status === "loaded" ? <img src="image.png" /> : <Placeholder />
 * }
 * ```
 */
export function useImage(props: UseImageProps) {
  const {
    src,
    srcSet,
    onLoad,
    onError,
    crossOrigin,
    sizes,
    ignoreFallback,
  } = props

  /**
   * Ignore this fallback complete in an SSR environment
   * so the `src` doesn't get missing in SSR.
   */
  const ignore = ignoreFallback || !isBrowser

  const [status, setStatus] = useState<Status>(() => {
    return src ? "loading" : "pending"
  })

  useEffect(() => {
    setStatus(src ? "loading" : "pending")
  }, [src])

  const imageRef = useRef<HTMLImageElement | null>()

  const load = useCallback(() => {
    if (!src) return

    flush()

    const img = new Image()

    img.src = src

    if (crossOrigin) {
      img.crossOrigin = crossOrigin
    }

    if (srcSet) {
      img.srcset = srcSet
    }

    if (sizes) {
      img.sizes = sizes
    }

    img.onload = (event) => {
      flush()
      setStatus("loaded")
      onLoad?.(event)
    }
    img.onerror = (error) => {
      flush()
      setStatus("failed")
      onError?.(error)
    }

    imageRef.current = img
  }, [src, crossOrigin, srcSet, sizes, onLoad, onError])

  const flush = () => {
    if (imageRef.current) {
      imageRef.current.onload = null
      imageRef.current.onerror = null
      imageRef.current = null
    }
  }

  useSafeLayoutEffect(() => {
    /**
     * If user opts out of the fallback/placeholder
     * logic, let's bail out.
     */
    if (ignore) return

    if (status === "loading") {
      load()
    }
    return () => {
      flush()
    }
  }, [status, load, ignore])

  /**
   * If user opts out of the fallback/placeholder
   * logic, let's just return 'loaded'
   */
  return ignore ? "loaded" : status
}

export type UseImageReturn = ReturnType<typeof useImage>
