import { cx } from "@chakra-ui/utils"
import { forwardRef } from "react"
import { HTMLChakraProps, chakra } from "../../styled-system"
import { useFieldContext, useFieldStyles } from "./field-context"

export interface FieldRequiredIndicatorProps extends HTMLChakraProps<"span"> {
  fallback?: React.ReactNode
}

/**
 * Used to show a "required" text or an asterisks (*) to indicate that
 * a field is required.
 */
export const FieldRequiredIndicator = forwardRef<
  HTMLSpanElement,
  FieldRequiredIndicatorProps
>(function FieldRequiredIndicator(props, ref) {
  const { fallback, children = "*", ...restProps } = props

  const field = useFieldContext()
  const styles = useFieldStyles()

  if (!field) return null

  return (
    <chakra.span
      ref={ref}
      aria-hidden="true"
      {...restProps}
      css={[styles.requiredIndicator, restProps.css]}
      className={cx("chakra-form__required-indicator", restProps.className)}
    >
      {field.isRequired ? children : fallback}
    </chakra.span>
  )
})

FieldRequiredIndicator.displayName = "FieldRequiredIndicator"
