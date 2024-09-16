"use client"

import type { Assign } from "@ark-ui/react"
import { Field as ArkField, useFieldContext } from "@ark-ui/react/field"
import { forwardRef } from "react"
import {
  type HTMLChakraProps,
  type SlotRecipeProps,
  type UnstyledProp,
  chakra,
  createSlotRecipeContext,
} from "../../styled-system"
import { cx } from "../../utils"
import { createIcon } from "../icon"

////////////////////////////////////////////////////////////////////////////////////

const {
  withProvider,
  withContext,
  useStyles: useFieldStyles,
  useClassNames,
  PropsProvider,
} = createSlotRecipeContext({ key: "field" })

export { useFieldStyles }

////////////////////////////////////////////////////////////////////////////////////

export interface FieldRootBaseProps
  extends Assign<ArkField.RootBaseProps, SlotRecipeProps<"field">>,
    UnstyledProp {}

export interface FieldRootProps
  extends HTMLChakraProps<"div", FieldRootBaseProps> {}

export const FieldRoot = withProvider<HTMLDivElement, FieldRootProps>(
  ArkField.Root,
  "root",
  { forwardAsChild: true },
)

////////////////////////////////////////////////////////////////////////////////////

export const FieldPropsProvider =
  PropsProvider as React.Provider<FieldRootBaseProps>

////////////////////////////////////////////////////////////////////////////////////

export interface FieldLabelProps
  extends HTMLChakraProps<"label", ArkField.LabelBaseProps> {}

export const FieldLabel = withContext<HTMLLabelElement, FieldLabelProps>(
  ArkField.Label,
  "label",
  { forwardAsChild: true },
)

////////////////////////////////////////////////////////////////////////////////////

export interface FieldHelperTextProps
  extends HTMLChakraProps<"div", ArkField.HelperTextBaseProps> {}

export const FieldHelperText = withContext<
  HTMLDivElement,
  FieldHelperTextProps
>(ArkField.HelperText, "helperText", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export interface FieldErrorTextProps
  extends HTMLChakraProps<"div", ArkField.ErrorTextBaseProps> {}

export const FieldErrorText = withContext<HTMLDivElement, FieldErrorTextProps>(
  ArkField.ErrorText,
  "errorText",
  { forwardAsChild: true },
)

////////////////////////////////////////////////////////////////////////////////////

export interface FieldErrorIconProps extends HTMLChakraProps<"svg"> {}

export const FieldErrorIcon = createIcon({
  d: "M11.983,0a12.206,12.206,0,0,0-8.51,3.653A11.8,11.8,0,0,0,0,12.207,11.779,11.779,0,0,0,11.8,24h.214A12.111,12.111,0,0,0,24,11.791h0A11.766,11.766,0,0,0,11.983,0ZM10.5,16.542a1.476,1.476,0,0,1,1.449-1.53h.027a1.527,1.527,0,0,1,1.523,1.47,1.475,1.475,0,0,1-1.449,1.53h-.027A1.529,1.529,0,0,1,10.5,16.542ZM11,12.5v-6a1,1,0,0,1,2,0v6a1,1,0,1,1-2,0Z",
})

////////////////////////////////////////////////////////////////////////////////////

export interface FieldRequiredIndicatorProps extends HTMLChakraProps<"span"> {
  fallback?: React.ReactNode
}

export const FieldRequiredIndicator = forwardRef<
  HTMLSpanElement,
  FieldRequiredIndicatorProps
>(function RequiredIndicator(props, ref) {
  const { fallback, children = "*", ...restProps } = props

  const field = useFieldContext()
  const classNames = useClassNames()
  const styles = useFieldStyles()

  if (!field?.required) {
    return fallback
  }

  return (
    <chakra.span
      ref={ref}
      aria-hidden="true"
      {...restProps}
      className={cx(classNames.requiredIndicator, props.className)}
      css={[styles.requiredIndicator, props.css]}
    >
      {children}
    </chakra.span>
  )
})
