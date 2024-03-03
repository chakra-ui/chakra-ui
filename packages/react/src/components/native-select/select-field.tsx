import { cx } from "@chakra-ui/utils"
import { HTMLChakraProps, chakra, forwardRef } from "../../styled-system"
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

    return (
      <chakra.select
        {...rest}
        {...fieldProps}
        ref={ref}
        className={cx("chakra-select__field", className)}
        css={styles.field}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {children}
      </chakra.select>
    )
  },
)

NativeSelectField.displayName = "NativeSelectField"
