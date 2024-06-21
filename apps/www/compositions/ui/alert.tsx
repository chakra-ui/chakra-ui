import { Box, Alert as ChakraAlert } from "@chakra-ui/react"
import { forwardRef } from "react"

export interface AlertProps extends ChakraAlert.RootProps {
  title?: string
  icon?: React.ReactElement
}

export const Alert = forwardRef<HTMLDivElement, AlertProps>(
  function Alert(props, ref) {
    const { title, children, icon, ...rest } = props
    return (
      <ChakraAlert.Root ref={ref} {...rest}>
        <ChakraAlert.Icon>{icon}</ChakraAlert.Icon>
        {children ? (
          <Box>
            <ChakraAlert.Title>{title}</ChakraAlert.Title>
            <ChakraAlert.Description>{children}</ChakraAlert.Description>
          </Box>
        ) : (
          <ChakraAlert.Title>{title}</ChakraAlert.Title>
        )}
      </ChakraAlert.Root>
    )
  },
)
