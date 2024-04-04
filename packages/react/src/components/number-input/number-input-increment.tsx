"use client"

import { cx } from "@chakra-ui/utils"
import { forwardRef } from "react"
import { HTMLChakraProps, chakra } from "../../styled-system"
import {
  useNumberInputContext,
  useNumberInputStyles,
} from "./number-input-context"

const UpIcon = (props: HTMLChakraProps<"svg">) => (
  <chakra.svg
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="m18 15-6-6-6 6" />
  </chakra.svg>
)

export interface NumberInputIncrementTriggerProps
  extends HTMLChakraProps<"button"> {}

export const NumberInputIncrementTrigger = forwardRef<
  HTMLButtonElement,
  NumberInputIncrementTriggerProps
>(function NumberIncrementStepper(props, ref) {
  const api = useNumberInputContext()
  const styles = useNumberInputStyles()
  return (
    <chakra.button
      {...api.getIncrementTriggerProps(props, ref)}
      css={[styles.incrementTrigger, props.css]}
      className={cx("chakra-number-input__stepper", props.className)}
    >
      {props.children ?? <UpIcon />}
    </chakra.button>
  )
})

NumberInputIncrementTrigger.displayName = "NumberInputIncrementTriggerProps"
