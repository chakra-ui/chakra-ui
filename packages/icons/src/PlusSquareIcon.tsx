import React from "react"
import { Icon, IconProps } from "@chakra-ui/icon"

export function PlusSquareIcon(props: IconProps) {
  return (
    <Icon viewBox="0 0 24 24" {...props}>
      <g
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="2"
      >
        <rect height="18" width="18" rx="2" ry="2" x="3" y="3" />
        <path d="M12 8v8" />
        <path d="M8 12h8" />
      </g>
    </Icon>
  )
}
