import { cx } from "@chakra-ui/utils/cx"
import { useEffect } from "react"
import { HTMLChakraProps, chakra, forwardRef } from "../system"
import { useDialogContext, useDialogStyles } from "./dialog-context"

export interface DialogHeaderProps extends HTMLChakraProps<"header"> {}

/**
 * React component that houses the title of the dialog.
 * @see Docs https://chakra-ui.com/dialog
 */
export const DialogHeader = forwardRef<DialogHeaderProps, "header">(
  (props, ref) => {
    const { className, ...rest } = props

    const { headerId, setHeaderMounted } = useDialogContext()

    useEffect(() => {
      setHeaderMounted(true)
      return () => setHeaderMounted(false)
    }, [setHeaderMounted])

    const styles = useDialogStyles()

    return (
      <chakra.header
        ref={ref}
        id={headerId}
        {...rest}
        className={cx("chakra-dialog__header", className)}
        __css={styles.header}
      />
    )
  },
)

DialogHeader.displayName = "DialogHeader"
