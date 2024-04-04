"use client"

import { cx } from "@chakra-ui/utils"
import { forwardRef } from "react"
import { HTMLChakraProps, chakra } from "../../styled-system"
import { useToastContext, useToastStyles } from "./toast-context"

export interface ToastCloseTriggerProps extends HTMLChakraProps<"button"> {}

export const ToastCloseTrigger = forwardRef<
  HTMLButtonElement,
  ToastCloseTriggerProps
>(function ToastCloseTrigger(props, ref) {
  const styles = useToastStyles()
  const api = useToastContext()

  return (
    <chakra.button
      {...api.getCloseTriggerProps(props, ref)}
      className={cx("chakra-toast__close-trigger", props.className)}
      css={[styles.closeTrigger, props.css]}
    />
  )
})
