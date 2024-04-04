"use client"

import { cx } from "@chakra-ui/utils"
import { forwardRef } from "react"
import { HTMLChakraProps, chakra } from "../../styled-system"
import {
  useNumberInputContext,
  useNumberInputStyles,
} from "./number-input-context"

const DownIcon = (props: HTMLChakraProps<"svg">) => (
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
    <path d="m6 9 6 6 6-6" />
  </chakra.svg>
)

export interface NumberInputDecrementTriggerProps
  extends HTMLChakraProps<"button"> {}

export const NumberInputDecrementTrigger = forwardRef<
  HTMLButtonElement,
  NumberInputDecrementTriggerProps
>(function NumberInputDecrementTrigger(props, ref) {
  const styles = useNumberInputStyles()
  const api = useNumberInputContext()

  return (
    <chakra.button
      {...api.getDecrementTriggerProps(props, ref)}
      css={[styles.decrementTrigger, props.css]}
      className={cx("chakra-number-input__stepper", props.className)}
    >
      {props.children ?? <DownIcon />}
    </chakra.button>
  )
})

NumberInputDecrementTrigger.displayName = "NumberInputDecrementTrigger"
