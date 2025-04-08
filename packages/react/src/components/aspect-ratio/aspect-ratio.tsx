"use client"

import { Children, forwardRef } from "react"
import {
  type ConditionalValue,
  type HTMLChakraProps,
  chakra,
  defineStyle,
} from "../../styled-system"
import { cx, mapObject } from "../../utils"

export interface AspectRatioProps
  extends Omit<HTMLChakraProps<"div">, "aspectRatio"> {
  /**
   * The aspect ratio of the Box. Common values are:
   *
   * `21/9`, `16/9`, `9/16`, `4/3`, `1.85/1`
   */
  ratio?: ConditionalValue<number>
}

const baseStyle = defineStyle({
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
})

export const AspectRatio = forwardRef<HTMLDivElement, AspectRatioProps>(
  function AspectRatio(props, ref) {
    const { ratio = 4 / 3, children, className, ...rest } = props
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
          paddingBottom: mapObject(ratio, (r) => `${(1 / r) * 100}%`),
        }}
        {...rest}
        css={[baseStyle, props.css]}
      >
        {child}
      </chakra.div>
    )
  },
)
