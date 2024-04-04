"use client"

import { cx } from "@chakra-ui/utils"
import { forwardRef } from "react"
import { HTMLChakraProps, chakra } from "../../styled-system"
import { useToastStyles } from "./toast-context"

export interface ToastDescriptionProps extends HTMLChakraProps<"div"> {}

export const ToastDescription = forwardRef<
  HTMLDivElement,
  ToastDescriptionProps
>(function ToastDescription(props, ref) {
  const styles = useToastStyles()

  return (
    <chakra.div
      ref={ref}
      {...props}
      className={cx("chakra-toast__description", props.className)}
      css={[styles.description, props.css]}
    />
  )
})
