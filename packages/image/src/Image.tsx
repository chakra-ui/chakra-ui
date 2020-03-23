import { chakra, PropsOf } from "@chakra-ui/styled"
import * as React from "react"
import { ImageHookProps, useImage } from "./Image.hook"

type CustomImageProps = {
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
}

const StyledImage = chakra("img")

export type ImageProps = ImageHookProps &
  PropsOf<typeof StyledImage> &
  CustomImageProps

export const Image = React.forwardRef(
  (props: ImageProps, ref: React.Ref<HTMLImageElement>) => {
    const status = useImage(props)
    const { fallbackSrc, fallback, src, htmlHeight, htmlWidth, ...rest } = props

    if (status !== "loaded") {
      if (fallback) return fallback
      return (
        <StyledImage
          ref={ref}
          src={fallbackSrc}
          htmlHeight={htmlHeight}
          htmlWidth={htmlWidth}
          {...rest}
        />
      )
    }

    return (
      <StyledImage
        src={src}
        htmlHeight={htmlHeight}
        htmlWidth={htmlWidth}
        ref={ref}
        {...rest}
      />
    )
  },
)
