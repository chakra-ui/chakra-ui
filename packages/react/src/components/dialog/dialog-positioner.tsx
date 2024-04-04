"use client"

import { cx } from "@chakra-ui/utils"
import { forwardRef } from "react"
import { HTMLChakraProps, chakra } from "../../styled-system"
import { useDialogContext, useDialogStyles } from "./dialog-context"

export interface DialogPositionerProps extends HTMLChakraProps<"div"> {}

export const DialogPositioner = forwardRef<
  HTMLDivElement,
  DialogPositionerProps
>(function DialogPositioner(props, ref) {
  const api = useDialogContext()
  const styles = useDialogStyles()

  return (
    <chakra.div
      {...api.getPositionerProps(props, ref)}
      className={cx("chakra-dialog__positioner", props.className)}
      tabIndex={-1}
      css={[styles.positioner, props.css]}
    />
  )
})

DialogPositioner.displayName = "DialogPositioner"
