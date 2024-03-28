"use client"

import { cx } from "@chakra-ui/utils"
import { forwardRef } from "react"
import { HTMLChakraProps, SystemStyleObject, chakra } from "../../styled-system"

interface ImageOptions {
  /**
   * How the image to fit within its bounds.
   * It maps to css `object-fit` property.
   * @type SystemStyleObject["objectFit"]
   */
  fit?: SystemStyleObject["objectFit"]
  /**
   * How to align the image within its bounds.
   * It maps to css `object-position` property.
   * @type SystemStyleObject["objectPosition"]
   */
  align?: SystemStyleObject["objectPosition"]
}

export interface ImageProps extends HTMLChakraProps<"img", ImageOptions> {}

/**
 * React component that renders an image with support
 * for fallbacks
 *
 * @see Docs https://chakra-ui.com/image
 */
export const Image = forwardRef<HTMLImageElement, ImageProps>(
  function Image(props, ref) {
    const { align, fit, ...rest } = props
    return (
      <chakra.img
        ref={ref}
        objectFit={fit}
        objectPosition={align}
        className={cx("chakra-image", props.className)}
        {...rest}
      />
    )
  },
)

Image.displayName = "Image"
