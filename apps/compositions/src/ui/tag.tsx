import { Tag as ChakraTag } from "@chakra-ui/react"
import { forwardRef } from "react"
import { HiX } from "react-icons/hi"

export interface TagProps extends ChakraTag.RootProps {
  icon?: React.ReactNode
  showClose?: boolean
  onClose?: VoidFunction
}

export const Tag = forwardRef<HTMLSpanElement, TagProps>(
  function Tag(props, ref) {
    const { icon, onClose, children, showClose, ...rest } = props
    return (
      <ChakraTag.Root ref={ref} {...rest}>
        {icon}
        <ChakraTag.Label>{children}</ChakraTag.Label>
        {showClose && (
          <ChakraTag.CloseTrigger onClick={onClose}>
            <HiX />
          </ChakraTag.CloseTrigger>
        )}
      </ChakraTag.Root>
    )
  },
)
