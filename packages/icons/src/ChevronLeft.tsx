import * as React from "react"
import { Icon, IconProps } from "@chakra-ui/icon"

export function ChevronLeftIcon(props: IconProps) {
  return (
    <Icon viewBox="0 0 24 24" {...props}>
      <path
        fill="currentColor"
        d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"
      />
    </Icon>
  )
}
