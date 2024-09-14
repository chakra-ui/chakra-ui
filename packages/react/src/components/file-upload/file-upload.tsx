"use client"

import type { Assign } from "@ark-ui/react"
import { FileUpload as ArkFileUpload } from "@ark-ui/react/file-upload"
import {
  type HTMLChakraProps,
  type SlotRecipeProps,
  type UnstyledProp,
  createSlotRecipeContext,
} from "../../styled-system"

////////////////////////////////////////////////////////////////////////////////////

const {
  withProvider,
  withContext,
  useStyles: useFileUploadStyles,
  PropsProvider,
} = createSlotRecipeContext({ key: "fileUpload" })

export { useFileUploadStyles }

////////////////////////////////////////////////////////////////////////////////////

export interface FileUploadRootBaseProps
  extends Assign<ArkFileUpload.RootBaseProps, SlotRecipeProps<"fileUpload">>,
    UnstyledProp {}

export interface FileUploadRootProps
  extends HTMLChakraProps<"div", FileUploadRootBaseProps> {}

export const FileUploadRoot = withProvider<HTMLDivElement, FileUploadRootProps>(
  ArkFileUpload.Root,
  "root",
  { forwardAsChild: true },
)

export const FileUploadRootPropsProvider =
  PropsProvider as React.Provider<FileUploadRootBaseProps>

////////////////////////////////////////////////////////////////////////////////////

export interface FileUploadDropzoneProps
  extends HTMLChakraProps<"li", ArkFileUpload.DropzoneBaseProps> {}

export const FileUploadDropzone = withContext<
  HTMLDivElement,
  FileUploadDropzoneProps
>(ArkFileUpload.Dropzone, "dropzone", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export interface FileUploadItemProps
  extends HTMLChakraProps<"li", ArkFileUpload.ItemBaseProps> {}

export const FileUploadItem = withContext<HTMLLIElement, FileUploadItemProps>(
  ArkFileUpload.Item,
  "item",
  { forwardAsChild: true },
)

////////////////////////////////////////////////////////////////////////////////////

export interface FileUploadItemDeleteTriggerProps
  extends HTMLChakraProps<"button", ArkFileUpload.ItemDeleteTriggerBaseProps> {}

export const FileUploadItemDeleteTrigger = withContext<
  HTMLButtonElement,
  FileUploadItemDeleteTriggerProps
>(ArkFileUpload.ItemDeleteTrigger, "itemDeleteTrigger", {
  forwardAsChild: true,
})

////////////////////////////////////////////////////////////////////////////////////

export interface FileUploadItemGroupProps
  extends HTMLChakraProps<"ul", ArkFileUpload.ItemGroupBaseProps> {}

export const FileUploadItemGroup = withContext<
  HTMLUListElement,
  FileUploadItemGroupProps
>(ArkFileUpload.ItemGroup, "itemGroup", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export interface FileUploadItemNameProps
  extends HTMLChakraProps<"span", ArkFileUpload.ItemNameBaseProps> {}

export const FileUploadItemName = withContext<
  HTMLSpanElement,
  FileUploadItemNameProps
>(ArkFileUpload.ItemName, "itemName", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export interface FileUploadItemPreviewProps
  extends HTMLChakraProps<"div", ArkFileUpload.ItemPreviewBaseProps> {}

export const FileUploadItemPreview = withContext<
  HTMLDivElement,
  FileUploadItemPreviewProps
>(ArkFileUpload.ItemPreview, "itemPreview", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export interface FileUploadItemPreviewImageProps
  extends HTMLChakraProps<"img", ArkFileUpload.ItemPreviewImageBaseProps> {}

export const FileUploadItemPreviewImage = withContext<
  HTMLImageElement,
  FileUploadItemPreviewImageProps
>(ArkFileUpload.ItemPreviewImage, "itemPreviewImage", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export interface FileUploadItemSizeTextProps
  extends HTMLChakraProps<"span", ArkFileUpload.ItemSizeTextBaseProps> {}

export const FileUploadItemSizeText = withContext<
  HTMLSpanElement,
  FileUploadItemSizeTextProps
>(ArkFileUpload.ItemSizeText, "itemSizeText", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export interface FileUploadLabelProps
  extends HTMLChakraProps<"label", ArkFileUpload.LabelBaseProps> {}

export const FileUploadLabel = withContext<
  HTMLLabelElement,
  FileUploadLabelProps
>(ArkFileUpload.Label, "label", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export interface FileUploadTriggerProps
  extends HTMLChakraProps<"button", ArkFileUpload.TriggerBaseProps> {}

export const FileUploadTrigger = withContext<
  HTMLButtonElement,
  FileUploadTriggerProps
>(ArkFileUpload.Trigger, "trigger", { forwardAsChild: true })
