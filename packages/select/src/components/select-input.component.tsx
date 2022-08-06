import { chakra, ChakraProps } from "@chakra-ui/system"
import { __DEV__ } from "@chakra-ui/utils"
import React from "react"
import { useSelectContext, useSelectStyles } from "../select"

interface SelectInputProps extends ChakraProps {
  name?: string
}

export const SelectInput = React.forwardRef<HTMLInputElement, SelectInputProps>(
  ({ name, ...restProps }, forwardRef) => {
    const styles = useSelectStyles()
    const { value } = useSelectContext()

    return (
      <chakra.input
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

if (__DEV__) {
  SelectInput.displayName = "SelectInput"
}
