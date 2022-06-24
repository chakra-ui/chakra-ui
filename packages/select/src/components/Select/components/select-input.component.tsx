import { Input, InputProps } from "@chakra-ui/react"
import React from "react"
import { useSelectContext, useSelectStyles } from "../select.component"

interface SelectInputProps extends InputProps {
  name?: string
}

const SelectInput = React.forwardRef<HTMLInputElement, SelectInputProps>(
  ({ name, ...restProps }, forwardRef) => {
    const styles = useSelectStyles()
    const { value } = useSelectContext()

    return (
      <Input
        {...restProps}
        ref={forwardRef}
        __css={styles.input}
        readOnly
        name={name}
        value={value || ""}
      />
    )
  },
)

SelectInput.displayName = "SelectInput"

export default SelectInput
