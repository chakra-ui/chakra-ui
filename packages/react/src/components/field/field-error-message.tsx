"use client"

import { cx } from "@chakra-ui/utils"
import { forwardRef } from "react"
import { HTMLChakraProps, chakra } from "../../styled-system"
import {
  FieldErrorStylesProvider,
  useFieldContext,
  useFieldStyles,
} from "./field-context"

export interface FieldErrorMessageProps extends HTMLChakraProps<"div"> {}

/**
 * Used to provide feedback about an invalid input,
 * and suggest clear instructions on how to fix it.
 */
export const FieldErrorMessage = forwardRef<
  HTMLDivElement,
  FieldErrorMessageProps
>(function FieldErrorMessage(props, ref) {
  const styles = useFieldStyles()
  const field = useFieldContext()

  if (!field?.invalid) return null

  return (
    <FieldErrorStylesProvider value={styles}>
      <chakra.div
        {...field?.getErrorMessageProps(props, ref)}
        className={cx("chakra-field__error-message", props.className)}
        css={[styles.errorMessage, props.css]}
      />
    </FieldErrorStylesProvider>
  )
})

FieldErrorMessage.displayName = "FieldErrorMessage"
