import React from "react"
import { Icon, IconProps } from "@chakra-ui/icon"

export function ExternalLinkIcon(props: IconProps) {
  return (
    <Icon viewBox="0 0 24 24" {...props}>
      <g
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="2"
      >
        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
        <path d="M15 3h6v6" />
        <path d="M10 14L21 3" />
      </g>
    </Icon>
  )
}

export default ExternalLinkIcon
