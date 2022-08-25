import { cx } from "@chakra-ui/shared-utils"
import {
  HTMLChakraProps,
  SystemStyleObject,
  chakra,
  forwardRef,
} from "@chakra-ui/system"
import { useEffect } from "react"

import { useModalContext, useModalStyles } from "./modal"

export interface ModalHeaderProps extends HTMLChakraProps<"header"> {}

/**
 * ModalHeader
 *
 * React component that houses the title of the modal.
 *
 * @see Docs https://chakra-ui.com/modal
 */
export const ModalHeader = forwardRef<ModalHeaderProps, "header">(
  (props, ref) => {
    const { className, ...rest } = props

    const { headerId, setHeaderMounted } = useModalContext()

    /**
     * Notify us if this component was rendered or used,
     * so we can append `aria-labelledby` automatically
     */
    useEffect(() => {
      setHeaderMounted(true)
      return () => setHeaderMounted(false)
    }, [setHeaderMounted])

    const _className = cx("chakra-modal__header", className)

    const styles = useModalStyles()
    const headerStyles: SystemStyleObject = {
      flex: 0,
      ...styles.header,
    }

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

ModalHeader.displayName = "ModalHeader"
