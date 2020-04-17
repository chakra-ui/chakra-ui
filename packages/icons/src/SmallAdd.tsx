import * as React from "react"
import { Icon, IconProps } from "@chakra-ui/icon"

export function SmallAddIcon(props: IconProps) {
  return (
    <Icon viewBox="0 0 20 20" {...props}>
      <path
        fill="currentColor"
        d="M14 9h-3V6c0-.55-.45-1-1-1s-1 .45-1 1v3H6c-.55 0-1 .45-1 1s.45 1 1 1h3v3c0 .55.45 1 1 1s1-.45 1-1v-3h3c.55 0 1-.45 1-1s-.45-1-1-1z"
        fillRule="evenodd"
      />
    </Icon>
  )
}
