import React from "react"
import { Icon, IconProps } from "@chakra-ui/icon"

export function QuestionOutlineIcon(props: IconProps) {
  return (
    <Icon viewBox="0 0 24 24" {...props}>
      <g stroke="currentColor" strokeWidth="1.5">
        <path
          strokeLinecap="round"
          fill="none"
          d="M9,9a3,3,0,1,1,4,2.829,1.5,1.5,0,0,0-1,1.415V14.25"
        />
        <path
          fill="none"
          strokeLinecap="round"
          d="M12,17.25a.375.375,0,1,0,.375.375A.375.375,0,0,0,12,17.25h0"
        />
        <circle fill="none" strokeMiterlimit="10" cx="12" cy="12" r="11.25" />
      </g>
    </Icon>
  )
}

export default QuestionOutlineIcon
