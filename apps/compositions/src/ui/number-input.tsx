import { NumberInput as ChakraNumberInput } from "@chakra-ui/react"
import * as React from "react"

export interface NumberInputProps extends ChakraNumberInput.RootProps {
  label?: React.ReactNode | undefined
}

export const NumberInputRoot = React.forwardRef<
  HTMLDivElement,
  NumberInputProps
>(function NumberInput(props, ref) {
  const { children, label, ...rest } = props
  return (
    <ChakraNumberInput.Root ref={ref} variant="outline" {...rest}>
      {label && <ChakraNumberInput.Label>{label}</ChakraNumberInput.Label>}
      <ChakraNumberInput.Control>
        {children}
        <ChakraNumberInput.TriggerGroup>
          <ChakraNumberInput.IncrementTrigger />
          <ChakraNumberInput.DecrementTrigger />
        </ChakraNumberInput.TriggerGroup>
      </ChakraNumberInput.Control>
    </ChakraNumberInput.Root>
  )
})

export const NumberInputField = ChakraNumberInput.Input
export const NumberInputScrubber = ChakraNumberInput.Scrubber
