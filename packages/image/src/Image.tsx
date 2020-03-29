import { chakra, PropsOf, SystemProps } from "@chakra-ui/system"
import React, { forwardRef, Ref, ReactElement } from "react"
import { ImageHookProps, useImage } from "./Image.hook"
import { __DEV__, omit } from "@chakra-ui/utils"

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
  fallback?: ReactElement
  /**
   * The native HTML `width` attribute to the passed to the `img`
   */
  htmlWidth?: string | number
  /**
   * The native HTML `height` attribute to the passed to the `img`
   */
  htmlHeight?: string | number
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
}

const StyledImage = chakra.img

export type ImageProps = ImageHookProps &
  PropsOf<typeof StyledImage> &
  ImageOptions

/**
 * React component that renders an image with support
 * for fallbacks
 *
 * @see Docs https://chakra-ui.com/image
 */
export const Image = forwardRef(
  (props: ImageProps, ref: Ref<HTMLImageElement>) => {
    const { fallbackSrc, fallback, src, align, fit, ...rest } = props

    const status = useImage(props)

    const shared = {
      ref,
      objectFit: fit,
      objectPosition: align,
      ...omit(rest, ["onError", "onLoad"]),
    }

    if (status !== "loaded") {
      if (fallback) return fallback
      return (
        <StyledImage
          data-chakra-image-placeholder=""
          src={fallbackSrc}
          {...shared}
        />
      )
    }

    return <StyledImage src={src} data-chakra-image="" {...shared} />
  },
)

if (__DEV__) {
  Image.displayName = "Image"
}
