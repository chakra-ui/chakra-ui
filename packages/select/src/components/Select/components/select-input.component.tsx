import { Input, InputProps } from "@chakra-ui/react"
import React from "react"
import { useSelectContext, useSelectStyles } from "../select.component"

interface SelectInputProps extends InputProps {
  name?: string
}

const SelectInput = React.forwardRef<HTMLInputElement, SelectInputProps>(
  ({ name, sx, ...restProps }, forwardRef) => {
    const styles = useSelectStyles()
    const { value } = useSelectContext()

    return (
      <Input
        {...restProps}
        ref={forwardRef}
        sx={{ ...styles.input, ...sx }}
        readOnly
        name={name}
        value={value || ""}
      />
    )
  },
)

SelectInput.displayName = "SelectInput"

export default SelectInput
