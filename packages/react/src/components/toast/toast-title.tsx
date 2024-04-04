"use client"

import { cx } from "@chakra-ui/utils"
import { forwardRef } from "react"
import { HTMLChakraProps, chakra } from "../../styled-system"
import { useToastStyles } from "./toast-context"

export interface ToastTitleProps extends HTMLChakraProps<"div"> {}

export const ToastTitle = forwardRef<HTMLDivElement, ToastTitleProps>(
  function ToastTitle(props, ref) {
    const styles = useToastStyles()

    return (
      <chakra.div
        ref={ref}
        {...props}
        className={cx("chakra-toast__title", props.className)}
        css={[styles.title, props.css]}
      />
    )
  },
)
