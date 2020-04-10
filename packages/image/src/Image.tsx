import { chakra, PropsOf, SystemProps } from "@chakra-ui/system"
import * as React from "react"
import { UseImageProps, useImage } from "./Image.hook"
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

const StyledImage = chakra.img

export type ImageProps = UseImageProps &
  PropsOf<typeof StyledImage> &
  ImageOptions

/**
 * React component that renders an image with support
 * for fallbacks
 *
 * @see Docs https://chakra-ui.com/image
 */
export const Image = React.forwardRef(
  (props: ImageProps, ref: React.Ref<HTMLImageElement>) => {
    const {
      fallbackSrc,
      fallback,
      src,
      align,
      fit,
      ignoreFallback,
      ...rest
    } = props

    const status = useImage(props)

    const shared = {
      ref,
      objectFit: fit,
      objectPosition: align,
      ...(ignoreFallback ? rest : omit(rest, ["onError", "onLoad"])),
    }

    if (status !== "loaded") {
      /**
       * If user passed a custom fallback component,
       * let's render it here.
       */
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
