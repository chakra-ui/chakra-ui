import { cx } from "@chakra-ui/utils/cx"
import { chakra, forwardRef, HTMLChakraProps } from "../system"
import { useFieldContext, useFieldStyles } from "./field-context"

export interface FieldHelpTextProps extends HTMLChakraProps<"div"> {}

/**
 * FieldHelpText
 *
 * Assistive component that conveys additional guidance
 * about the field, such as how it will be used and what
 * types in values should be provided.
 */
export const FieldHelpText = forwardRef<FieldHelpTextProps, "div">(
  function FieldHelpText(props, ref) {
    const field = useFieldContext()
    const styles = useFieldStyles()
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

FieldHelpText.displayName = "FieldHelpText"
