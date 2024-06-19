import { forwardRef } from "react"
import { Checkbox as ChakraCheckbox } from "../src"

export interface CheckboxProps extends ChakraCheckbox.RootProps {
  icon?: React.ReactNode
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  function Checkbox(props, ref) {
    const { icon, children, ...rest } = props
    return (
      <ChakraCheckbox.Root ref={ref} {...rest}>
        <ChakraCheckbox.Control>
          {icon || <ChakraCheckbox.Indicator />}
        </ChakraCheckbox.Control>
        <ChakraCheckbox.Label>{children}</ChakraCheckbox.Label>
      </ChakraCheckbox.Root>
    )
  },
)
