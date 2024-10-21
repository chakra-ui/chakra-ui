"use client"

import { type HTMLChakraProps, chakra } from "../../styled-system"

export interface InputElementProps extends HTMLChakraProps<"div"> {}

export const InputElement = chakra("div", {
  base: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    zIndex: 2,
    color: "fg.subtle",
    height: "full",
    fontSize: "sm",
    px: "3",
  },
  variants: {
    placement: {
      start: {
        insetInlineStart: "0",
      },
      end: {
        insetInlineEnd: "0",
      },
    },
  },
})
