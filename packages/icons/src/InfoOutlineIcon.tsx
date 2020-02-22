import React from "react"
import { Icon, IconProps } from "@chakra-ui/icon"

export function InfoOutlineIcon(props: IconProps) {
  return (
    <Icon viewBox="0 0 24 24" {...props}>
      <g
        fill="currentColor"
        stroke="currentColor"
        strokeLinecap="square"
        strokeWidth="2"
      >
        <circle cx="12" cy="12" fill="none" r="11" stroke="currentColor" />
        <line fill="none" x1="11.959" x2="11.959" y1="11" y2="17" />
        <circle cx="11.959" cy="7" r="1" stroke="none" />
      </g>
    </Icon>
  )
}

export default InfoOutlineIcon
