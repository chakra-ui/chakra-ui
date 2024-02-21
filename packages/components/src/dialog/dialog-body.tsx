import { cx } from "@chakra-ui/utils/cx"
import { useEffect } from "react"
import { HTMLChakraProps, chakra, forwardRef } from "../system"
import { useDialogContext, useDialogStyles } from "./dialog-context"

export interface DialogBodyProps extends HTMLChakraProps<"div"> {}

/**
 * React component that houses the main content of the dialog.
 * @see Docs https://chakra-ui.com/dialog
 */
export const DialogBody = forwardRef<DialogBodyProps, "div">((props, ref) => {
  const { className, ...rest } = props
  const { bodyId, setBodyMounted } = useDialogContext()

  /**
   * Notify us if this component was rendered or used,
   * so we can append `aria-describedby` automatically
   */
  useEffect(() => {
    setBodyMounted(true)
    return () => setBodyMounted(false)
  }, [setBodyMounted])

  const _className = cx("chakra-dialog__body", className)
  const styles = useDialogStyles()

  return (
    <chakra.div
      ref={ref}
      className={_className}
      id={bodyId}
      {...rest}
      __css={styles.body}
    />
  )
})

DialogBody.displayName = "DialogBody"
