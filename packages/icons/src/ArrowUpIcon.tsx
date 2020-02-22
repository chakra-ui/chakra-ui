import React from "react"
import { Icon, IconProps } from "@chakra-ui/icon"

export function ArrowUpIcon(props: IconProps) {
  return (
    <Icon viewBox="0 0 24 24" {...props}>
      <path
        fill="currentColor"
        d="M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z"
      />
    </Icon>
  )
}
