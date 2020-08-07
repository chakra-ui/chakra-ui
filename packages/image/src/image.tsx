import { chakra, PropsOf, SystemProps, forwardRef } from "@chakra-ui/system"
import { omit, __DEV__ } from "@chakra-ui/utils"
import * as React from "react"
import { useImage, UseImageProps } from "./use-image"

interface ImageOptions {
  /**
   * Fallback image `src` to show if image is loading or image fails.
   *
   * Note 🚨: We recommend you use a local image
   */
  fallbackSrc?: string
  /**
   * Fallback element to show if image is loading or image fails.
   */
  fallback?: React.ReactElement
  /**
   * The native HTML `width` attribute to the passed to the `img`
   */
  htmlWidth?: string | number
  /**
   * The native HTML `height` attribute to the passed to the `img`
   */
  htmlHeight?: string | number
  /**
   * Defines loading strategy
   */
  loading?: "eager" | "lazy"
  /**
   * How the image to fit within it's bounds.
   * It maps to css `object-fit` property.
   */
  fit?: SystemProps["objectFit"]
  /**
   * How to align the image within its bounds.
   * It maps to css `object-position` property.
   */
  align?: SystemProps["objectPosition"]
  /**
   * If `true`, opt out of the `fallbackSrc` logic and use as `img`
   */
  ignoreFallback?: boolean
}

export interface ImageProps
  extends UseImageProps,
    Omit<PropsOf<typeof chakra.img>, keyof UseImageProps>,
    ImageOptions {}

/**
 * React component that renders an image with support
 * for fallbacks
 *
 * @see Docs https://chakra-ui.com/components/image
 */
export const Image = forwardRef<ImageProps, "img">(function Image(props, ref) {
  const {
    fallbackSrc,
    fallback,
    src,
    align,
    fit,
    loading,
    ignoreFallback,
    crossOrigin,
    ...rest
  } = props

  /**
   * Defer to native `img` tag if `loading` prop is passed
   * @see https://github.com/chakra-ui/chakra-ui/issues/1027
   */
  const shouldIgnore = loading != null || ignoreFallback

  const status = useImage({
    ...props,
    ignoreFallback: shouldIgnore,
  })

  const shared = {
    ref,
    objectFit: fit,
    objectPosition: align,
    ...(shouldIgnore ? rest : omit(rest, ["onError", "onLoad"])),
  }

  if (status !== "loaded") {
    /**
     * If user passed a custom fallback component,
     * let's render it here.
     */
    if (fallback) return fallback

    return (
      <chakra.img
        className="chakra-image__placeholder"
        src={fallbackSrc}
        {...shared}
      />
    )
  }

  return (
    <chakra.img
      src={src}
      crossOrigin={crossOrigin}
      loading={loading}
      className="chakra-image"
      {...shared}
    />
  )
})

if (__DEV__) {
  Image.displayName = "Image"
}
