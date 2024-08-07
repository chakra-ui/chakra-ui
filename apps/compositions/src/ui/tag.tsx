import { Tag as ChakraTag } from "@chakra-ui/react"
import { forwardRef } from "react"

export interface TagProps extends ChakraTag.RootProps {
  startElement?: React.ReactNode
  endElement?: React.ReactNode
  onClose?: VoidFunction
  closable?: boolean
}

export const Tag = forwardRef<HTMLSpanElement, TagProps>(
  function Tag(props, ref) {
    const {
      startElement,
      endElement,
      onClose,
      closable = !!onClose,
      children,
      ...rest
    } = props

    return (
      <ChakraTag.Root ref={ref} {...rest}>
        {startElement}
        <ChakraTag.Label>{children}</ChakraTag.Label>
        {endElement}
        {closable && <ChakraTag.CloseTrigger onClick={onClose} />}
      </ChakraTag.Root>
    )
  },
)
