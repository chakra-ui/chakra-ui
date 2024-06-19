"use client"

import {
  Checkbox as ArkCheckbox,
  useCheckboxContext,
} from "@ark-ui/react/checkbox"
import { forwardRef } from "react"
import {
  type HTMLChakraProps,
  type SlotRecipeProps,
  type UnstyledProp,
  chakra,
  createStyleContext,
} from "../../styled-system"
import { Checkmark } from "../checkmark"

////////////////////////////////////////////////////////////////////////////////////

const {
  withProvider,
  withContext,
  useStyles: useCheckboxStyles,
} = createStyleContext("checkbox")

export { useCheckboxStyles }

////////////////////////////////////////////////////////////////////////////////////

export interface CheckboxRootProps
  extends HTMLChakraProps<"label", ArkCheckbox.RootBaseProps>,
    SlotRecipeProps<"checkbox">,
    UnstyledProp {}

export const CheckboxRoot = withProvider<HTMLLabelElement, CheckboxRootProps>(
  ArkCheckbox.Root,
  "root",
  { forwardAsChild: true },
)

////////////////////////////////////////////////////////////////////////////////////

export interface CheckboxLabelProps
  extends HTMLChakraProps<"span", ArkCheckbox.LabelBaseProps> {}

export const CheckboxLabel = withContext<HTMLElement, CheckboxLabelProps>(
  ArkCheckbox.Label,
  "label",
  { forwardAsChild: true },
)

////////////////////////////////////////////////////////////////////////////////////

export interface CheckboxControlProps
  extends HTMLChakraProps<"div", ArkCheckbox.ControlBaseProps> {}

export const CheckboxControl = withContext<HTMLElement, CheckboxControlProps>(
  ArkCheckbox.Control,
  "control",
  { forwardAsChild: true },
)

////////////////////////////////////////////////////////////////////////////////////

export interface CheckboxIndicatorProps extends HTMLChakraProps<"svg"> {
  checked?: React.ReactElement
  indeterminate?: React.ReactElement
}

export const CheckboxIndicator = forwardRef<
  SVGSVGElement,
  CheckboxIndicatorProps
>(function CheckboxIndicator(props, ref) {
  const { checked, indeterminate, ...rest } = props

  const api = useCheckboxContext()
  const styles = useCheckboxStyles()

  if (checked && api.checked) {
    return (
      <chakra.svg
        ref={ref}
        asChild
        {...rest}
        css={[styles.indicator, props.css]}
      >
        {checked}
      </chakra.svg>
    )
  }

  if (indeterminate && api.indeterminate) {
    return (
      <chakra.svg
        ref={ref}
        asChild
        {...rest}
        css={[styles.indicator, props.css]}
      >
        {indeterminate}
      </chakra.svg>
    )
  }

  return (
    <Checkmark
      ref={ref}
      checked={api.checked}
      indeterminate={api.indeterminate}
      disabled={api.disabled}
      unstyled
      {...rest}
      css={[styles.indicator, props.css]}
    />
  )
})

////////////////////////////////////////////////////////////////////////////////////

export interface CheckboxGroupProps
  extends HTMLChakraProps<"div", ArkCheckbox.GroupBaseProps> {}

export const CheckboxGroup = chakra(
  ArkCheckbox.Group,
  {},
  { forwardAsChild: true },
)
