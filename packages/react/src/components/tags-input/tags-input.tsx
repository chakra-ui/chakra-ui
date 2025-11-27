"use client"

import type { Assign } from "@ark-ui/react"
import {
  TagsInput as ArkTagsInput,
  useTagsInputContext,
} from "@ark-ui/react/tags-input"
import {
  type HTMLChakraProps,
  type SlotRecipeProps,
  type UnstyledProp,
  createSlotRecipeContext,
} from "../../styled-system"
import { For } from "../for"
import { CloseIcon } from "../icons"

////////////////////////////////////////////////////////////////////////////////////

const {
  withProvider,
  withContext,
  useStyles: useTagsInputStyles,
  PropsProvider,
} = createSlotRecipeContext({ key: "tagsInput" })

export { useTagsInputStyles }

////////////////////////////////////////////////////////////////////////////////////

export interface TagsInputRootProviderBaseProps
  extends Assign<
      ArkTagsInput.RootProviderBaseProps,
      SlotRecipeProps<"tagsInput">
    >,
    UnstyledProp {}

export interface TagsInputRootProviderProps
  extends HTMLChakraProps<"div", TagsInputRootProviderBaseProps> {}

export const TagsInputRootProvider = withProvider<
  HTMLDivElement,
  TagsInputRootProviderProps
>(ArkTagsInput.RootProvider, "root", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export interface TagsInputRootBaseProps
  extends Assign<ArkTagsInput.RootBaseProps, SlotRecipeProps<"tagsInput">>,
    UnstyledProp {}

export interface TagsInputRootProps
  extends HTMLChakraProps<"div", TagsInputRootBaseProps> {}

export const TagsInputRoot = withProvider<HTMLDivElement, TagsInputRootProps>(
  ArkTagsInput.Root,
  "root",
  { forwardAsChild: true, defaultProps: { editable: false } },
)

export const TagsInputPropsProvider =
  PropsProvider as React.Provider<TagsInputRootBaseProps>

////////////////////////////////////////////////////////////////////////////////////

export interface TagsInputLabelProps
  extends HTMLChakraProps<"label", ArkTagsInput.LabelBaseProps>,
    UnstyledProp {}

export const TagsInputLabel = withContext<
  HTMLLabelElement,
  TagsInputLabelProps
>(ArkTagsInput.Label, "label", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export interface TagsInputControlProps
  extends HTMLChakraProps<"div", ArkTagsInput.ControlBaseProps>,
    UnstyledProp {}

export const TagsInputControl = withContext<
  HTMLDivElement,
  TagsInputControlProps
>(ArkTagsInput.Control, "control", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export interface TagsInputInputProps
  extends HTMLChakraProps<"input", ArkTagsInput.InputBaseProps>,
    UnstyledProp {}

export const TagsInputInput = withContext<
  HTMLInputElement,
  TagsInputInputProps
>(ArkTagsInput.Input, "input", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export interface TagsInputItemProps
  extends HTMLChakraProps<"div", ArkTagsInput.ItemBaseProps>,
    UnstyledProp {}

export const TagsInputItem = withContext<HTMLDivElement, TagsInputItemProps>(
  ArkTagsInput.Item,
  "item",
  { forwardAsChild: true },
)

////////////////////////////////////////////////////////////////////////////////////

export interface TagsInputItemTextProps
  extends HTMLChakraProps<"span", ArkTagsInput.ItemTextBaseProps>,
    UnstyledProp {}

export const TagsInputItemText = withContext<
  HTMLSpanElement,
  TagsInputItemTextProps
>(ArkTagsInput.ItemText, "itemText", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export interface TagsInputItemDeleteTriggerProps
  extends HTMLChakraProps<"button", ArkTagsInput.ItemDeleteTriggerBaseProps>,
    UnstyledProp {}

export const TagsInputItemDeleteTrigger = withContext<
  HTMLButtonElement,
  TagsInputItemDeleteTriggerProps
>(ArkTagsInput.ItemDeleteTrigger, "itemDeleteTrigger", {
  forwardAsChild: true,
  defaultProps: { children: <CloseIcon /> },
})

////////////////////////////////////////////////////////////////////////////////////

export interface TagsInputItemPreviewProps
  extends HTMLChakraProps<"div", ArkTagsInput.ItemPreviewBaseProps>,
    UnstyledProp {}

export const TagsInputItemPreview = withContext<
  HTMLDivElement,
  HTMLChakraProps<"div", ArkTagsInput.ItemPreviewBaseProps> & UnstyledProp
>(ArkTagsInput.ItemPreview, "itemPreview", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export interface TagsInputItemInputProps
  extends HTMLChakraProps<"input", ArkTagsInput.ItemInputBaseProps>,
    UnstyledProp {}

export const TagsInputItemInput = withContext<
  HTMLInputElement,
  TagsInputItemInputProps
>(ArkTagsInput.ItemInput, "itemInput", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export interface TagsInputClearTriggerProps
  extends HTMLChakraProps<"button", ArkTagsInput.ClearTriggerBaseProps>,
    UnstyledProp {}

export const TagsInputClearTrigger = withContext<
  HTMLButtonElement,
  TagsInputClearTriggerProps
>(ArkTagsInput.ClearTrigger, "clearTrigger", {
  forwardAsChild: true,
  defaultProps: { children: <CloseIcon /> },
})

////////////////////////////////////////////////////////////////////////////////////

export interface TagsInputItemsProps
  extends Omit<TagsInputItemProps, "value" | "index"> {}

export const TagsInputItems = (props: TagsInputItemsProps) => {
  const api = useTagsInputContext()
  return (
    <For each={api.value}>
      {(item, index) => (
        <TagsInputItem key={index} index={index} value={item} {...props}>
          <TagsInputItemPreview>
            <TagsInputItemText>{item}</TagsInputItemText>
            <TagsInputItemDeleteTrigger />
          </TagsInputItemPreview>
          <TagsInputItemInput />
        </TagsInputItem>
      )}
    </For>
  )
}

////////////////////////////////////////////////////////////////////////////////////

export const TagsInputContext = ArkTagsInput.Context
export const TagsInputHiddenInput = ArkTagsInput.HiddenInput
export const TagsInputItemContext = ArkTagsInput.ItemContext

export interface TagsInputValueChangeDetails
  extends ArkTagsInput.ValueChangeDetails {}

export interface TagsInputValidityChangeDetails
  extends ArkTagsInput.ValidityChangeDetails {}
