"use client"

import type { Assign, CollectionItem } from "@ark-ui/react"
import {
  Combobox as ArkCombobox,
  useComboboxContext,
} from "@ark-ui/react/combobox"
import { type JSX, forwardRef } from "react"
import {
  type HTMLChakraProps,
  type SlotRecipeProps,
  type UnstyledProp,
  chakra,
  createSlotRecipeContext,
} from "../../styled-system"
import { cx } from "../../utils"
import { CheckIcon, ChevronDownIcon, CloseIcon } from "../icons"

const {
  withProvider,
  withContext,
  useStyles: useComboboxStyles,
  useClassNames,
  PropsProvider,
} = createSlotRecipeContext({ key: "combobox" })

export { useComboboxStyles }

////////////////////////////////////////////////////////////////////////////////////

export interface ComboboxRootProviderBaseProps<T extends CollectionItem = any>
  extends Assign<
      ArkCombobox.RootProviderBaseProps<T>,
      SlotRecipeProps<"combobox">
    >,
    UnstyledProp {}

export interface ComboboxRootProviderProps<T extends CollectionItem = any>
  extends HTMLChakraProps<"div", ComboboxRootProviderBaseProps<T>> {}

interface ComboboxRootProviderComponent {
  <T extends CollectionItem>(props: ComboboxRootProviderProps<T>): JSX.Element
}

export const ComboboxRootProvider = withProvider<
  HTMLDivElement,
  ComboboxRootProviderProps
>(ArkCombobox.RootProvider, "root", {
  forwardAsChild: true,
}) as ComboboxRootProviderComponent

////////////////////////////////////////////////////////////////////////////////////

export interface ComboboxRootBaseProps<T extends CollectionItem = any>
  extends Assign<ArkCombobox.RootBaseProps<T>, SlotRecipeProps<"combobox">>,
    UnstyledProp {}

export interface ComboboxRootProps<T extends CollectionItem = any>
  extends HTMLChakraProps<"div", ComboboxRootBaseProps<T>> {}

export interface ComboboxRootComponent {
  <T extends CollectionItem>(
    props: ComboboxRootProps<T> & React.RefAttributes<HTMLDivElement>,
  ): JSX.Element
}

export const ComboboxRoot = withProvider<HTMLDivElement, ComboboxRootProps>(
  ArkCombobox.Root,
  "root",
  { forwardAsChild: true },
) as ComboboxRootComponent

////////////////////////////////////////////////////////////////////////////////////

export const ComboboxPropsProvider =
  PropsProvider as React.Provider<ComboboxRootBaseProps>

////////////////////////////////////////////////////////////////////////////////////

export interface ComboboxTriggerProps
  extends HTMLChakraProps<"button", ArkCombobox.TriggerBaseProps> {}

export const ComboboxTrigger = withContext<
  HTMLButtonElement,
  ComboboxTriggerProps
>(ArkCombobox.Trigger, "trigger", {
  forwardAsChild: true,
  forwardProps: ["focusable"],
  defaultProps: {
    children: <ChevronDownIcon />,
  },
})

////////////////////////////////////////////////////////////////////////////////////

export interface ComboboxPositionerProps
  extends HTMLChakraProps<"div", ArkCombobox.PositionerBaseProps> {}

export const ComboboxPositioner = withContext<
  HTMLDivElement,
  ComboboxPositionerProps
>(ArkCombobox.Positioner, "positioner", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export interface ComboboxContentProps
  extends HTMLChakraProps<"div", ArkCombobox.ContentBaseProps> {}

export const ComboboxContent = withContext<
  HTMLDivElement,
  ComboboxContentProps
>(ArkCombobox.Content, "content", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export interface ComboboxInputProps
  extends HTMLChakraProps<"input", ArkCombobox.InputBaseProps> {}

export const ComboboxInput = withContext<HTMLInputElement, ComboboxInputProps>(
  ArkCombobox.Input,
  "input",
  { forwardAsChild: true },
)

////////////////////////////////////////////////////////////////////////////////////

export interface ComboboxClearTriggerProps
  extends HTMLChakraProps<"button", ArkCombobox.ClearTriggerBaseProps> {}

export const ComboboxClearTrigger = withContext<
  HTMLButtonElement,
  ComboboxClearTriggerProps
>(ArkCombobox.ClearTrigger, "clearTrigger", {
  forwardAsChild: true,
  defaultProps: {
    children: <CloseIcon />,
  },
})

////////////////////////////////////////////////////////////////////////////////////

export interface ComboboxIndicatorGroupProps extends HTMLChakraProps<"div"> {}

export const ComboboxIndicatorGroup = withContext<
  HTMLDivElement,
  ComboboxIndicatorGroupProps
>("div", "indicatorGroup")

////////////////////////////////////////////////////////////////////////////////////

export interface ComboboxItemGroupProps
  extends HTMLChakraProps<"div", ArkCombobox.ItemGroupBaseProps> {}

export const ComboboxItemGroup = withContext<
  HTMLDivElement,
  ComboboxItemGroupProps
>(ArkCombobox.ItemGroup, "itemGroup", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export interface ComboboxItemGroupLabelProps
  extends HTMLChakraProps<"div", ArkCombobox.ItemGroupLabelBaseProps> {}

export const ComboboxItemGroupLabel = withContext<
  HTMLDivElement,
  ComboboxItemGroupLabelProps
>(ArkCombobox.ItemGroupLabel, "itemGroupLabel", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export interface ComboboxItemProps
  extends HTMLChakraProps<"div", ArkCombobox.ItemBaseProps> {}

export const ComboboxItem = withContext<HTMLDivElement, ComboboxItemProps>(
  ArkCombobox.Item,
  "item",
  { forwardAsChild: true },
)

////////////////////////////////////////////////////////////////////////////////////

export interface ComboboxItemTextProps
  extends HTMLChakraProps<"div", ArkCombobox.ItemTextBaseProps> {}

export const ComboboxItemText = withContext<
  HTMLDivElement,
  ComboboxItemTextProps
>(ArkCombobox.ItemText, "itemText", { forwardAsChild: true })
////////////////////////////////////////////////////////////////////////////////////

export interface ComboboxItemIndicatorProps
  extends HTMLChakraProps<"div", ArkCombobox.ItemIndicatorBaseProps> {}

export const ComboboxItemIndicator = withContext<
  HTMLDivElement,
  ComboboxItemIndicatorProps
>(ArkCombobox.ItemIndicator, "itemIndicator", {
  forwardAsChild: true,
  defaultProps: {
    children: <CheckIcon />,
  },
})
////////////////////////////////////////////////////////////////////////////////////

export interface ComboboxControlProps
  extends HTMLChakraProps<"div", ArkCombobox.ControlBaseProps> {}

export const ComboboxControl = withContext<
  HTMLDivElement,
  ComboboxControlProps
>(ArkCombobox.Control, "control", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export interface ComboboxLabelProps
  extends HTMLChakraProps<"label", ArkCombobox.LabelBaseProps> {}

export const ComboboxLabel = withContext<HTMLLabelElement, ComboboxLabelProps>(
  ArkCombobox.Label,
  "label",
  { forwardAsChild: true },
)

////////////////////////////////////////////////////////////////////////////////////

export interface ComboboxEmptyProps extends HTMLChakraProps<"div"> {}

export const ComboboxEmpty = forwardRef<HTMLDivElement, ComboboxEmptyProps>(
  function ComboboxEmpty(props, ref) {
    const combobox = useComboboxContext()
    const styles = useComboboxStyles()
    const classNames = useClassNames()
    if (combobox.collection.size !== 0) return null
    return (
      <chakra.div
        ref={ref}
        {...props}
        role="presentation"
        data-scope="combobox"
        data-part="empty"
        className={cx(classNames.empty, props.className)}
        css={[styles.empty, props.css]}
      />
    )
  },
)

////////////////////////////////////////////////////////////////////////////////////

export const ComboboxContext = ArkCombobox.Context

////////////////////////////////////////////////////////////////////////////////////

export const ComboboxItemContext = ArkCombobox.ItemContext

////////////////////////////////////////////////////////////////////////////////////

export interface ComboboxHighlightChangeDetails<T extends CollectionItem = any>
  extends ArkCombobox.HighlightChangeDetails<T> {}

export interface ComboboxValueChangeDetails<T extends CollectionItem = any>
  extends ArkCombobox.ValueChangeDetails<T> {}

export interface ComboboxOpenChangeDetails
  extends ArkCombobox.OpenChangeDetails {}

export interface ComboboxInputValueChangeDetails
  extends ArkCombobox.InputValueChangeDetails {}
