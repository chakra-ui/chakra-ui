"use client"

import { cx } from "@chakra-ui/utils"
import { forwardRef, useEffect } from "react"
import { HTMLChakraProps, chakra } from "../../styled-system"
import { useDialogContext, useDialogStyles } from "./dialog-context"

export interface DialogBodyProps extends HTMLChakraProps<"div"> {}

export const DialogBody = forwardRef<HTMLDivElement, DialogBodyProps>(
  function DialogBody(props, ref) {
    const { bodyId, setBodyMounted } = useDialogContext()

    useEffect(() => {
      setBodyMounted(true)
      return () => setBodyMounted(false)
    }, [setBodyMounted])

    const styles = useDialogStyles()

    return (
      <chakra.div
        ref={ref}
        id={bodyId}
        {...props}
        className={cx("chakra-dialog__body", props.className)}
        css={[styles.body, props.css]}
      />
    )
  },
)

DialogBody.displayName = "DialogBody"
