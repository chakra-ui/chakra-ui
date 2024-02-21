import { defineStyle } from "@chakra-ui/styled-system"
import { cx } from "@chakra-ui/utils/cx"
import { HTMLChakraProps, chakra, forwardRef } from "../system"
import { useSelectContext, useSelectStyles } from "./select-context"

type Omitted = "disabled" | "required" | "readOnly" | "size"

export interface NativeSelectFieldProps
  extends Omit<HTMLChakraProps<"select">, Omitted> {
  /**
   * @default false
   */
  isDisabled?: boolean
}

export const NativeSelectField = forwardRef<NativeSelectFieldProps, "select">(
  function NativeSelectField(props, ref) {
    const { children, placeholder, className, ...rest } = props

    const styles = useSelectStyles()
    const fieldProps = useSelectContext()

    const fieldStyles = defineStyle({
      paddingEnd: "2rem",
      ...styles.field,
      _focus: {
        zIndex: "unset",
        ...(styles as any).field?.["_focus"],
      },
    })

    return (
      <chakra.select
        {...rest}
        {...fieldProps}
        ref={ref}
        className={cx("chakra-select__field", className)}
        __css={fieldStyles}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {children}
      </chakra.select>
    )
  },
)

NativeSelectField.displayName = "NativeSelectField"
