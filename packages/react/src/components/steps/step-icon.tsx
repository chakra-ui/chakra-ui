"use client"

import { cx } from "@chakra-ui/utils"
import { HTMLChakraProps, chakra } from "../../styled-system"
import { useStepContext, useStepperStyles } from "./step-context"

function CheckIcon(props: StepIconProps) {
  return (
    <chakra.svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M20 6 9 17l-5-5" />
    </chakra.svg>
  )
}

export interface StepIconProps extends HTMLChakraProps<"svg"> {}

export function StepIcon(props: StepIconProps) {
  const api = useStepContext()
  const styles = useStepperStyles()

  if (api.status === "completed") {
    return (
      <CheckIcon
        {...props}
        css={styles.icon}
        className={cx("chakra-step__icon", props.className)}
      />
    )
  }

  return null
}
