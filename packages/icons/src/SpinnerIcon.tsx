import React from "react"
import { Icon, IconProps } from "@chakra-ui/icon"

export function SpinnerIcon(props: IconProps) {
  return (
    <Icon viewBox="0 0 24 24" {...props}>
      <defs>
        <linearGradient
          x1="28.154%"
          y1="63.74%"
          x2="74.629%"
          y2="17.783%"
          id="a"
        >
          <stop stopColor="currentColor" offset="0%" />
          <stop stopColor="#fff" stopOpacity="0" offset="100%" />
        </linearGradient>
      </defs>
      <g transform="translate(2)" fill="none">
        <circle stroke="url(#a)" strokeWidth="4" cx="10" cy="12" r="10" />
        <path
          d="M10 2C4.477 2 0 6.477 0 12"
          stroke="currentColor"
          strokeWidth="4"
        />
        <rect fill="currentColor" x="8" width="4" height="4" rx="8" />
      </g>
    </Icon>
  )
}
