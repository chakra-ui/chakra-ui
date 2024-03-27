import { cx } from "@chakra-ui/utils/cx"
import { chakra, forwardRef, HTMLChakraProps } from "../system"
import { useFieldContext, useFieldStyles } from "./field-context"

export interface RequiredIndicatorProps extends HTMLChakraProps<"span"> {}

/**
 * Used to show a "required" text or an asterisks (*) to indicate that
 * a field is required.
 */
export const RequiredIndicator = forwardRef<RequiredIndicatorProps, "span">(
  function RequiredIndicator(props, ref) {
    const field = useFieldContext()
    const styles = useFieldStyles()

    if (!field?.isRequired) return null

    const className = cx("chakra-form__required-indicator", props.className)

    return (
      <chakra.span
        {...field?.getRequiredIndicatorProps(props, ref)}
        __css={styles.requiredIndicator}
        className={className}
      />
    )
  },
)

RequiredIndicator.displayName = "RequiredIndicator"
