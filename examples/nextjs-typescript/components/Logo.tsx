import * as React from "react"
import { chakra, keyframes, ImageProps } from "@chakra-ui/core"
import logo from "./logo.svg"

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`

export const Logo = (props: ImageProps) => (
  <chakra.img
    css={{
      "@media (prefers-reduced-motion: no-preference)": {
        animation: `${spin} infinite 20s linear`,
      },
    }}
    alt=""
    src={logo}
    {...props}
  />
)
