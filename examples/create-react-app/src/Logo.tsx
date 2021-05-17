import React from "react"
import {
  Image,
  ImageProps,
  keyframes,
  usePrefersReducedMotion,
} from "@chakra-ui/react"
import logo from "./logo.svg"

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`

export const Logo = (props: ImageProps) => {
  const prefersReducedMotion = usePrefersReducedMotion()

  const animation = prefersReducedMotion
    ? undefined
    : `${spin} infinite 20s linear`

  return <Image animation={animation} src={logo} {...props} />
}
