import React from "react"
import { Icon, IconProps } from "@chakra-ui/icon"

export function ChevronUpIcon(props: IconProps) {
  return (
    <Icon viewBox="0 0 24 24" {...props}>
      <path
        fill="currentColor"
        d="M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z"
      />
    </Icon>
  )
}

export default ChevronUpIcon
