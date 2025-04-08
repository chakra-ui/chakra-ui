"use client"

import { type HTMLChakraProps, chakra } from "../../styled-system"

export interface AbsoluteCenterProps extends HTMLChakraProps<"div"> {
  axis?: "horizontal" | "vertical" | "both"
}

/**
 * React component used to horizontally and vertically center an element
 * relative to its parent dimensions.
 *
 * It uses the `position: absolute` strategy.
 *
 * @see Docs https://chakra-ui.com/center
 */
export const AbsoluteCenter = chakra("div", {
  base: {
    position: "absolute",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  variants: {
    axis: {
      horizontal: {
        insetStart: "50%",
        translate: "-50%",
        _rtl: {
          translate: "50%",
        },
      },
      vertical: {
        top: "50%",
        translate: "0 -50%",
      },
      both: {
        insetStart: "50%",
        top: "50%",
        translate: "-50% -50%",
        _rtl: {
          translate: "50% -50%",
        },
      },
    },
  },
  defaultVariants: {
    axis: "both",
  },
})

AbsoluteCenter.displayName = "AbsoluteCenter"
