import { cx } from "@chakra-ui/utils"
import { useEffect } from "react"
import { HTMLChakraProps, chakra, forwardRef } from "../../styled-system"
import { useDialogContext, useDialogStyles } from "./dialog-context"

export interface DialogBodyProps extends HTMLChakraProps<"div"> {}

export const DialogBody = forwardRef<DialogBodyProps, "div">((props, ref) => {
  const { className, ...rest } = props
  const { bodyId, setBodyMounted } = useDialogContext()

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
      css={styles.body}
    />
  )
})

DialogBody.displayName = "DialogBody"
