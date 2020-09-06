import * as React from "react"
import { chakra, keyframes, ImageProps, forwardRef } from "@chakra-ui/core"
import logo from "./logo.svg"

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`

export const Logo = forwardRef<ImageProps, "img">((props, ref) => (
  <chakra.img
    css={{
      "@media (prefers-reduced-motion: no-preference)": {
        animation: `${spin} infinite 20s linear`,
      },
    }}
    src={logo}
    ref={ref}
    {...props}
  />
))
