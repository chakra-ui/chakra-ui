import { defineStyle } from "@chakra-ui/styled-system"
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

    const _className = cx("chakra-dialog__header", className)

    const styles = useDialogStyles()
    const headerStyles = defineStyle({
      flex: 0,
      ...styles.header,
    })

    return (
      <chakra.header
        ref={ref}
        className={_className}
        id={headerId}
        {...rest}
        __css={headerStyles}
      />
    )
  },
)

DialogHeader.displayName = "DialogHeader"
