import React from "react"
import { Icon, IconProps } from "@chakra-ui/icon"

export function ArrowForwardIcon(props: IconProps) {
  return (
    <Icon viewBox="0 0 24 24" {...props}>
      <path
        fill="currentColor"
        d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"
      />
    </Icon>
  )
}
