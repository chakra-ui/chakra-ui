"use client"

import { cx } from "@chakra-ui/utils"
import { forwardRef } from "react"
import { type HTMLChakraProps, chakra } from "../../styled-system"
import { useFieldContext, useFieldStyles } from "./field-context"

export interface FieldHelpTextProps extends HTMLChakraProps<"div"> {}

/**
 * FieldHelpText
 *
 * Assistive component that conveys additional guidance
 * about the field, such as how it will be used and what
 * types in values should be provided.
 */
export const FieldHelpText = forwardRef<HTMLDivElement, FieldHelpTextProps>(
  function FieldHelpText(props, ref) {
    const field = useFieldContext()
    const styles = useFieldStyles()
    return (
      <chakra.div
        {...field?.getHelpTextProps(props, ref)}
        css={[styles["helpText"], props.css]}
        className={cx("chakra-field__help-text", props.className)}
      />
    )
  },
)

FieldHelpText.displayName = "FieldHelpText"
