import { cx } from "@chakra-ui/shared-utils"
import { HTMLChakraProps, chakra, forwardRef } from "@chakra-ui/system"

type Omitted = "disabled" | "required" | "readOnly" | "size"

export interface SelectFieldProps
  extends Omit<HTMLChakraProps<"select">, Omitted> {
  /**
   * @default false
   */
  isDisabled?: boolean
}

export const SelectField = forwardRef<SelectFieldProps, "select">(
  function SelectField(props, ref) {
    const { children, placeholder, className, ...rest } = props

    return (
      <chakra.select
        {...rest}
        ref={ref}
        className={cx("chakra-select", className)}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {children}
      </chakra.select>
    )
  },
)

SelectField.displayName = "SelectField"
