import { Switch as ChakraSwitch } from "@chakra-ui/react"
import { forwardRef } from "react"

export interface SwitchProps extends ChakraSwitch.RootProps {
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>
  rootRef?: React.Ref<HTMLLabelElement>
  onLabel?: React.ReactNode
  offLabel?: React.ReactNode
  thumbIcon?: { on: React.ReactNode; off: React.ReactNode }
}

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  function Switch(props, ref) {
    const {
      inputProps,
      children,
      rootRef,
      onLabel,
      offLabel,
      thumbIcon,
      ...rest
    } = props

    return (
      <ChakraSwitch.Root ref={rootRef} {...rest}>
        <ChakraSwitch.HiddenInput ref={ref} {...inputProps} />
        <ChakraSwitch.Control>
          <ChakraSwitch.Thumb>
            {thumbIcon && (
              <ChakraSwitch.ThumbIndicator fallback={thumbIcon?.off}>
                {thumbIcon?.on}
              </ChakraSwitch.ThumbIndicator>
            )}
          </ChakraSwitch.Thumb>
          {(onLabel || offLabel) && (
            <ChakraSwitch.Indicator fallback={offLabel}>
              {onLabel}
            </ChakraSwitch.Indicator>
          )}
        </ChakraSwitch.Control>
        {children != null && (
          <ChakraSwitch.Label>{children}</ChakraSwitch.Label>
        )}
      </ChakraSwitch.Root>
    )
  },
)
