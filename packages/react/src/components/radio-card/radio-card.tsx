"use client"

import { RadioGroup as ArkRadioGroup } from "@ark-ui/react/radio-group"
import { forwardRef } from "react"
import {
  type HTMLChakraProps,
  type SlotRecipeProps,
  type UnstyledProp,
  createStyleContext,
} from "../../styled-system"
import { Radiomark } from "../radiomark"

////////////////////////////////////////////////////////////////////////////////////

const {
  withProvider,
  withContext,
  useStyles: useRadioGroupStyles,
} = createStyleContext("radioCard")

export { useRadioGroupStyles }

////////////////////////////////////////////////////////////////////////////////////

export interface RadioCardRootProps
  extends HTMLChakraProps<"div", ArkRadioGroup.RootBaseProps>,
    SlotRecipeProps<"radioCard">,
    UnstyledProp {}

export const RadioCardRoot = withProvider<HTMLDivElement, RadioCardRootProps>(
  ArkRadioGroup.Root,
  "root",
  { forwardAsChild: true },
)

////////////////////////////////////////////////////////////////////////////////////

export interface RadioCardLabelProps
  extends HTMLChakraProps<"div", ArkRadioGroup.LabelBaseProps> {}

export const RadioCardLabel = withContext<HTMLDivElement, RadioCardLabelProps>(
  ArkRadioGroup.Label,
  "label",
  { forwardAsChild: true },
)

////////////////////////////////////////////////////////////////////////////////////

export interface RadioCardItemProps
  extends HTMLChakraProps<"div", ArkRadioGroup.ItemBaseProps> {}

export const RadioCardItem = withContext<HTMLDivElement, RadioCardItemProps>(
  ArkRadioGroup.Item,
  "item",
  { forwardAsChild: true },
)

////////////////////////////////////////////////////////////////////////////////////

export interface RadioCardItemTextProps
  extends HTMLChakraProps<"span", ArkRadioGroup.ItemTextBaseProps> {}

export const RadioCardItemText = withContext<
  HTMLSpanElement,
  RadioCardItemTextProps
>(ArkRadioGroup.ItemText, "itemText", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export interface RadioCardItemControlProps
  extends HTMLChakraProps<"div", ArkRadioGroup.ItemControlBaseProps> {}

export const RadioCardItemControl = withContext<
  HTMLDivElement,
  RadioCardItemControlProps
>(ArkRadioGroup.ItemControl, "itemControl", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export interface RadioCardItemAddonProps extends HTMLChakraProps<"div"> {}

export const RadioCardItemAddon = withContext<
  HTMLElement,
  RadioCardItemAddonProps
>("div", "itemAddon")

////////////////////////////////////////////////////////////////////////////////////

export interface RadioCardItemIndicatorProps extends HTMLChakraProps<"span"> {}

export const RadioCardItemIndicator = forwardRef<
  HTMLSpanElement,
  RadioCardItemIndicatorProps
>(function RadioGroupItemIndicator(props, ref) {
  const styles = useRadioGroupStyles()
  return (
    <ArkRadioGroup.ItemContext>
      {(itemState) => (
        <Radiomark
          ref={ref}
          unstyled
          {...props}
          checked={itemState.checked}
          disabled={itemState.disabled}
          css={[styles["itemIndicator"], props.css]}
        />
      )}
    </ArkRadioGroup.ItemContext>
  )
})
