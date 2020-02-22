import React from "react"
import { Icon, IconProps } from "@chakra-ui/icon"

export function ChevronDownIcon(props: IconProps) {
  return (
    <Icon viewBox="0 0 24 24" {...props}>
      <path
        fill="currentColor"
        d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"
      />
    </Icon>
  )
}

export default ChevronDownIcon
