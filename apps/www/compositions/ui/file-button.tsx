import { FileUpload as ChakraFileUpload } from "@chakra-ui/react"
import { forwardRef } from "react"

export interface FileButtonProps extends ChakraFileUpload.RootProps {
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>
  rootRef?: React.Ref<HTMLDivElement>
}

export const FileButton = forwardRef<HTMLInputElement, FileButtonProps>(
  function FileButton(props, ref) {
    const { children, inputProps, rootRef, ...rest } = props
    return (
      <ChakraFileUpload.Root ref={rootRef} {...rest}>
        <ChakraFileUpload.HiddenInput ref={ref} {...inputProps} />
        <ChakraFileUpload.Trigger asChild>{children}</ChakraFileUpload.Trigger>
      </ChakraFileUpload.Root>
    )
  },
)
