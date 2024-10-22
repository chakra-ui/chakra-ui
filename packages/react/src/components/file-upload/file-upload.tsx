"use client"

import type { Assign } from "@ark-ui/react"
import {
  FileUpload as ArkFileUpload,
  useFileUploadContext,
} from "@ark-ui/react/file-upload"
import { forwardRef } from "react"
import {
  type HTMLChakraProps,
  type SlotRecipeProps,
  type UnstyledProp,
  chakra,
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

export interface FileUploadRootProviderBaseProps
  extends Assign<
      ArkFileUpload.RootProviderBaseProps,
      SlotRecipeProps<"fileUpload">
    >,
    UnstyledProp {}

export interface FileUploadRootProviderProps
  extends HTMLChakraProps<"div", FileUploadRootProviderBaseProps> {}

export const FileUploadRootProvider = withProvider<
  HTMLDivElement,
  FileUploadRootProviderProps
>(ArkFileUpload.RootProvider, "root", { forwardAsChild: true })

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

////////////////////////////////////////////////////////////////////////////////////

export const FileUploadPropsProvider =
  PropsProvider as React.Provider<FileUploadRootBaseProps>

////////////////////////////////////////////////////////////////////////////////////

export interface FileUploadClearTriggerProps
  extends HTMLChakraProps<"button"> {}

export const FileUploadClearTrigger = forwardRef<
  HTMLButtonElement,
  FileUploadClearTriggerProps
>(function FileUploadClearTrigger(props, ref) {
  const fileUpload = useFileUploadContext()
  return (
    <chakra.button
      ref={ref}
      type="button"
      data-scope="file-upload"
      data-part="clear-trigger"
      aria-label="Clear selected files"
      hidden={fileUpload.acceptedFiles.length === 0}
      {...props}
      onClick={(event) => {
        props.onClick?.(event)
        if (event.defaultPrevented) return
        fileUpload.clearFiles()
      }}
    />
  )
})

////////////////////////////////////////////////////////////////////////////////////

export interface FileUploadDropzoneProps
  extends HTMLChakraProps<"li", ArkFileUpload.DropzoneBaseProps> {}

export const FileUploadDropzone = withContext<
  HTMLDivElement,
  FileUploadDropzoneProps
>(ArkFileUpload.Dropzone, "dropzone", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export interface FileUploadDropzoneContentProps
  extends HTMLChakraProps<"div"> {}

export const FileUploadDropzoneContent = withContext<
  HTMLDivElement,
  FileUploadDropzoneContentProps
>("div", "dropzoneContent")

////////////////////////////////////////////////////////////////////////////////////

export interface FileUploadItemProps
  extends HTMLChakraProps<"li", ArkFileUpload.ItemBaseProps> {}

export const FileUploadItem = withContext<HTMLLIElement, FileUploadItemProps>(
  ArkFileUpload.Item,
  "item",
  { forwardAsChild: true },
)

////////////////////////////////////////////////////////////////////////////////////

export interface FileUploadItemContentProps extends HTMLChakraProps<"div"> {}

export const FileUploadItemContent = withContext<
  HTMLDivElement,
  FileUploadItemContentProps
>("div", "itemContent")

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

////////////////////////////////////////////////////////////////////////////////////

export const FileUploadContext = ArkFileUpload.Context
export const FileUploadHiddenInput = ArkFileUpload.HiddenInput

export interface FileUploadFileAcceptDetails
  extends ArkFileUpload.FileAcceptDetails {}

export interface FileUploadFileRejectDetails
  extends ArkFileUpload.FileRejectDetails {}

export interface FileUploadFileChangeDetails
  extends ArkFileUpload.FileChangeDetails {}
