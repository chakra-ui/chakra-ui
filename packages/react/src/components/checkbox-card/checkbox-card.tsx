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
  createStyleContext,
} from "../../styled-system"
import { Checkmark } from "../checkmark"

////////////////////////////////////////////////////////////////////////////////////

const {
  withProvider,
  withContext,
  useStyles: useCheckboxCardStyles,
} = createStyleContext("checkboxCard")

export { useCheckboxCardStyles }

////////////////////////////////////////////////////////////////////////////////////

export interface CheckboxCardRootProps
  extends HTMLChakraProps<"label", ArkCheckbox.RootBaseProps>,
    SlotRecipeProps<"checkboxCard">,
    UnstyledProp {}

export const CheckboxCardRoot = withProvider<
  HTMLLabelElement,
  CheckboxCardRootProps
>(ArkCheckbox.Root, "root", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export interface CheckboxCardLabelProps
  extends HTMLChakraProps<"span", ArkCheckbox.LabelBaseProps> {}

export const CheckboxCardLabel = withContext<
  HTMLElement,
  CheckboxCardLabelProps
>(ArkCheckbox.Label, "label", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export interface CheckboxCardControlProps
  extends HTMLChakraProps<"div", ArkCheckbox.ControlBaseProps> {}

export const CheckboxCardControl = withContext<
  HTMLDivElement,
  CheckboxCardControlProps
>(ArkCheckbox.Control, "control", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export interface CheckboxCardIndicatorProps extends HTMLChakraProps<"svg"> {}

export const CheckboxCardIndicator = forwardRef<
  SVGSVGElement,
  CheckboxCardIndicatorProps
>(function CheckboxCardIndicator(props, ref) {
  const api = useCheckboxContext()
  const styles = useCheckboxCardStyles()
  return (
    <Checkmark
      ref={ref}
      checked={api.checked}
      indeterminate={api.indeterminate}
      disabled={api.disabled}
      unstyled
      {...props}
      css={[styles.indicator, props.css]}
    />
  )
})

////////////////////////////////////////////////////////////////////////////////////

export interface CheckboxCardAddonProps extends HTMLChakraProps<"div"> {}

export const CheckboxCardAddon = withContext<
  HTMLElement,
  CheckboxCardAddonProps
>("div", "addon")
