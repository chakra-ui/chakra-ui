"use client"

import { RadioGroup as ArkRadioGroup } from "@ark-ui/react/radio-group"
import { forwardRef } from "react"
import {
  type HTMLChakraProps,
  type SlotRecipeProps,
  type UnstyledProp,
  createSlotRecipeContext,
} from "../../styled-system"
import { Radiomark } from "../radiomark"

////////////////////////////////////////////////////////////////////////////////////

const {
  withProvider,
  withContext,
  useStyles: useRadioGroupStyles,
} = createSlotRecipeContext("radioGroup")

export { useRadioGroupStyles }

////////////////////////////////////////////////////////////////////////////////////

export interface RadioGroupRootProps
  extends HTMLChakraProps<"div", ArkRadioGroup.RootBaseProps>,
    SlotRecipeProps<"radioGroup">,
    UnstyledProp {}

export const RadioGroupRoot = withProvider<HTMLDivElement, RadioGroupRootProps>(
  ArkRadioGroup.Root,
  "root",
  { forwardAsChild: true },
)

////////////////////////////////////////////////////////////////////////////////////

export interface RadioGroupLabelProps
  extends HTMLChakraProps<"div", ArkRadioGroup.LabelBaseProps> {}

export const RadioGroupLabel = withContext<
  HTMLDivElement,
  RadioGroupLabelProps
>(ArkRadioGroup.Label, "label", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export interface RadioGroupItemProps
  extends HTMLChakraProps<"div", ArkRadioGroup.ItemBaseProps> {}

export const RadioGroupItem = withContext<HTMLDivElement, RadioGroupItemProps>(
  ArkRadioGroup.Item,
  "item",
  { forwardAsChild: true },
)

////////////////////////////////////////////////////////////////////////////////////

export interface RadioGroupItemTextProps
  extends HTMLChakraProps<"span", ArkRadioGroup.ItemTextBaseProps> {}

export const RadioGroupItemText = withContext<
  HTMLSpanElement,
  RadioGroupItemTextProps
>(ArkRadioGroup.ItemText, "itemText", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export interface RadioGroupItemControlProps
  extends HTMLChakraProps<"div", ArkRadioGroup.ItemControlBaseProps> {}

export const RadioGroupItemControl = withContext<
  HTMLDivElement,
  RadioGroupItemControlProps
>(ArkRadioGroup.ItemControl, "itemControl", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export interface RadioGroupItemIndicatorProps extends HTMLChakraProps<"span"> {}

export const RadioGroupItemIndicator = forwardRef<
  HTMLSpanElement,
  RadioGroupItemIndicatorProps
>(function RadioGroupItemIndicator(props, ref) {
  const styles = useRadioGroupStyles()
  return (
    <ArkRadioGroup.ItemContext>
      {(itemState) => (
        <ArkRadioGroup.ItemControl asChild>
          <Radiomark
            ref={ref}
            unstyled
            {...props}
            checked={itemState.checked}
            disabled={itemState.disabled}
            css={[styles["itemControl"], props.css]}
          />
        </ArkRadioGroup.ItemControl>
      )}
    </ArkRadioGroup.ItemContext>
  )
})
