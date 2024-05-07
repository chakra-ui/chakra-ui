"use client"

import { cx, mapResponsive } from "@chakra-ui/utils"
import { Children, forwardRef } from "react"
import {
  type ConditionalValue,
  type HTMLChakraProps,
  chakra,
} from "../../styled-system"

export interface AspectRatioProps
  extends Omit<HTMLChakraProps<"div">, "aspectRatio"> {
  /**
   * The aspect ratio of the Box. Common values are:
   *
   * `21/9`, `16/9`, `9/16`, `4/3`, `1.85/1`
   */
  ratio?: ConditionalValue<number>
}

/**
 * React component used to cropping media (videos, images and maps)
 * to a desired aspect ratio.
 *
 * @see Docs https://chakra-ui.com/aspectratiobox
 */
export const AspectRatio = forwardRef<HTMLDivElement, AspectRatioProps>(
  function AspectRatio(props, ref) {
    const { ratio = 4 / 3, children, className, ...rest } = props

    // enforce single child
    const child = Children.only(children)

    return (
      <chakra.div
        ref={ref}
        position="relative"
        className={cx("chakra-aspect-ratio", className)}
        _before={{
          height: 0,
          content: `""`,
          display: "block",
          paddingBottom: mapResponsive(ratio, (r) => `${(1 / r) * 100}%`),
        }}
        css={{
          "& > *:not(style)": {
            overflow: "hidden",
            position: "absolute",
            top: "0",
            right: "0",
            bottom: "0",
            left: "0",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100%",
          },
          "& > img, & > video": {
            objectFit: "cover",
          },
          ...props.css,
        }}
        {...rest}
      >
        {child}
      </chakra.div>
    )
  },
)

AspectRatio.displayName = "AspectRatio"
