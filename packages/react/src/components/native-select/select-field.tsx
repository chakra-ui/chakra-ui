import { cx } from "@chakra-ui/utils"
import {
  HTMLChakraProps,
  chakra,
  forwardRef,
  mergeProps,
} from "../../styled-system"
import { useSelectContext, useSelectStyles } from "./select-context"

type Omitted = "disabled" | "required" | "readOnly" | "size"

export interface NativeSelectFieldProps
  extends Omit<HTMLChakraProps<"select">, Omitted> {}

export const NativeSelectField = forwardRef<NativeSelectFieldProps, "select">(
  function NativeSelectField(props, ref) {
    const { children, placeholder, ...restProps } = props

    const styles = useSelectStyles()
    const fieldProps = useSelectContext()

    return (
      <chakra.select
        {...mergeProps(fieldProps, restProps as any)}
        ref={ref}
        className={cx("chakra-select__field", props.className)}
        css={[styles.field, props.css]}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {children}
      </chakra.select>
    )
  },
)

NativeSelectField.displayName = "NativeSelectField"
