import type { ColorPalette } from "@chakra-ui/react"
import { Status as ChakraStatus } from "@chakra-ui/react"
import { forwardRef } from "react"

type StatusValue = "success" | "error" | "warning" | "info"

export interface StatusProps extends ChakraStatus.RootProps {
  value?: StatusValue
}

const statusMap: Record<StatusValue, ColorPalette> = {
  success: "green",
  error: "red",
  warning: "yellow",
  info: "gray",
}

export const Status = forwardRef<HTMLDivElement, StatusProps>(
  function Status(props, ref) {
    const { children, value = "info", ...rest } = props
    const colorPalette = statusMap[value]
    return (
      <ChakraStatus.Root colorPalette={colorPalette} ref={ref} {...rest}>
        <ChakraStatus.Indicator />
        {children}
      </ChakraStatus.Root>
    )
  },
)
