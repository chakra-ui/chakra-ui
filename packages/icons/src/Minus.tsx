import * as React from "react"
import { Icon, IconProps } from "@chakra-ui/icon"

export function MinusIcon(props: IconProps) {
  return (
    <Icon viewBox="0 0 24 24" {...props}>
      <g fill="currentColor">
        <rect height="4" width="20" x="2" y="10" />
      </g>
    </Icon>
  )
}
