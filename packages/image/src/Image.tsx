import { chakra, PropsOf, SystemProps } from "@chakra-ui/system"
import * as React from "react"
import { ImageHookProps, useImage } from "./Image.hook"
import { __DEV__ } from "@chakra-ui/utils"

type ImageOptions = {
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
}

const StyledImage = chakra.img

export type ImageProps = ImageHookProps &
  PropsOf<typeof StyledImage> &
  ImageOptions

export const Image = React.forwardRef(
  (props: ImageProps, ref: React.Ref<HTMLImageElement>) => {
    const status = useImage(props)
    const { fallbackSrc, fallback, src, align, fit, ...rest } = props

    const shared = { ref, objectFit: fit, objectPosition: align, ...rest }

    if (status !== "loaded") {
      if (fallback) return fallback
      return <StyledImage src={fallbackSrc} {...shared} />
    }

    return <StyledImage src={src} {...shared} />
  },
)

if (__DEV__) {
  Image.displayName = "Image"
}
