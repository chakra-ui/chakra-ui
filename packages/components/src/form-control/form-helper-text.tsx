import { cx } from "@chakra-ui/utils/cx"
import { chakra, forwardRef, HTMLChakraProps } from "../system"
import {
  useFormControlContext,
  useFormControlStyles,
} from "./form-control-context"

export interface FormHelperTextProps extends HTMLChakraProps<"div"> {}

/**
 * FormHelperText
 *
 * Assistive component that conveys additional guidance
 * about the field, such as how it will be used and what
 * types in values should be provided.
 */
export const FormHelperText = forwardRef<FormHelperTextProps, "div">(
  function FormHelperText(props, ref) {
    const field = useFormControlContext()
    const styles = useFormControlStyles()
    const className = cx("chakra-form__helper-text", props.className)
    return (
      <chakra.div
        {...field?.getHelpTextProps(props, ref)}
        __css={styles.helperText}
        className={className}
      />
    )
  },
)

FormHelperText.displayName = "FormHelperText"
