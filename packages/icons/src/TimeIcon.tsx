import React from "react"
import { Icon, IconProps } from "@chakra-ui/icon"

export function TimeIcon(props: IconProps) {
  return (
    <Icon viewBox="0 0 24 24" {...props}>
      <g fill="currentColor">
        <path d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm0,22A10,10,0,1,1,22,12,10.011,10.011,0,0,1,12,22Z" />
        <path d="M17.134,15.81,12.5,11.561V6.5a1,1,0,0,0-2,0V12a1,1,0,0,0,.324.738l4.959,4.545a1.01,1.01,0,0,0,1.413-.061A1,1,0,0,0,17.134,15.81Z" />
      </g>
    </Icon>
  )
}

export default TimeIcon
