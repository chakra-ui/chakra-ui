import { RadioGroup } from "@chakra-ui/react"
import { forwardRef } from "react"

export interface RadioItemProps extends RadioGroup.ItemProps {
  rootRef?: React.Ref<HTMLDivElement>
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>
}

export const RadioItem = forwardRef<HTMLInputElement, RadioItemProps>(
  function RadioItem(props, ref) {
    const { children, inputProps, rootRef, ...rest } = props
    return (
      <RadioGroup.Item ref={rootRef} {...rest}>
        <RadioGroup.ItemHiddenInput ref={ref} {...inputProps} />
        <RadioGroup.ItemIndicator />
        {children && <RadioGroup.ItemText>{children}</RadioGroup.ItemText>}
      </RadioGroup.Item>
    )
  },
)
