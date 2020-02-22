import React from "react"
import { Icon, IconProps } from "@chakra-ui/icon"

export function ArrowUpDownIcon(props: IconProps) {
  return (
    <Icon viewBox="0 0 16 16" {...props}>
      <path
        fill="currentColor"
        d="M11.891 9.992a1 1 0 1 1 1.416 1.415l-4.3 4.3a1 1 0 0 1-1.414 0l-4.3-4.3A1 1 0 0 1 4.71 9.992l3.59 3.591 3.591-3.591zm0-3.984L8.3 2.417 4.709 6.008a1 1 0 0 1-1.416-1.415l4.3-4.3a1 1 0 0 1 1.414 0l4.3 4.3a1 1 0 1 1-1.416 1.415z"
      />
    </Icon>
  )
}

export default ArrowUpDownIcon
