"use client"

import { forwardRef } from "react"
import {
  type HTMLChakraProps,
  type SystemStyleObject,
  chakra,
} from "../../styled-system"
import { cx } from "../../utils"

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
 * @see Docs https://www.chakra-ui.com/docs/components/image
 */
export const Image = forwardRef<HTMLImageElement, ImageProps>(
  function Image(props, ref) {
    const { align, fit = "cover", ...rest } = props
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
