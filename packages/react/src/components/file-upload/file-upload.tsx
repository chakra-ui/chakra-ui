import { FileUpload as ArkFileUpload } from "@ark-ui/react/file-upload"
import {
  type HTMLChakraProps,
  type SlotRecipeProps,
  type UnstyledProp,
  createStyleContext,
} from "../../styled-system"

////////////////////////////////////////////////////////////////////////////////////

const { withProvider, withContext } = createStyleContext("FileUpload")

////////////////////////////////////////////////////////////////////////////////////

export interface FileUploadRootProps
  extends HTMLChakraProps<"div", ArkFileUpload.RootProps>,
    SlotRecipeProps<"FileUpload">,
    UnstyledProp {}

export const FileUploadRoot = withProvider<HTMLDivElement, FileUploadRootProps>(
  ArkFileUpload.Root,
  "root",
  { forwardAsChild: true },
)

////////////////////////////////////////////////////////////////////////////////////

export interface FileUploadDropzoneProps
  extends HTMLChakraProps<"li", ArkFileUpload.DropzoneProps> {}

export const FileUploadDropzone = withContext<
  HTMLDivElement,
  FileUploadDropzoneProps
>(ArkFileUpload.Dropzone, "dropzone", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export interface FileUploadItemProps
  extends HTMLChakraProps<"li", ArkFileUpload.ItemProps> {}

export const FileUploadItem = withContext<HTMLLIElement, FileUploadItemProps>(
  ArkFileUpload.Item,
  "item",
  { forwardAsChild: true },
)

////////////////////////////////////////////////////////////////////////////////////

export interface FileUploadItemDeleteTriggerProps
  extends HTMLChakraProps<"button", ArkFileUpload.ItemDeleteTriggerProps> {}

export const FileUploadItemDeleteTrigger = withContext<
  HTMLButtonElement,
  FileUploadItemDeleteTriggerProps
>(ArkFileUpload.ItemDeleteTrigger, "itemDeleteTrigger", {
  forwardAsChild: true,
})

////////////////////////////////////////////////////////////////////////////////////

export interface FileUploadItemGroupProps
  extends HTMLChakraProps<"ul", ArkFileUpload.ItemGroupProps> {}

export const FileUploadItemGroup = withContext<
  HTMLUListElement,
  FileUploadItemGroupProps
>(ArkFileUpload.ItemGroup, "itemGroup", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export interface FileUploadItemNameProps
  extends HTMLChakraProps<"span", ArkFileUpload.ItemNameProps> {}

export const FileUploadItemName = withContext<
  HTMLSpanElement,
  FileUploadItemNameProps
>(ArkFileUpload.ItemName, "itemName", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export interface FileUploadItemPreviewProps
  extends HTMLChakraProps<"div", ArkFileUpload.ItemPreviewProps> {}

export const FileUploadItemPreview = withContext<
  HTMLDivElement,
  FileUploadItemPreviewProps
>(ArkFileUpload.ItemPreview, "itemPreview", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export interface FileUploadItemPreviewImageProps
  extends HTMLChakraProps<"img", ArkFileUpload.ItemPreviewImageProps> {}

export const FileUploadItemPreviewImage = withContext<
  HTMLImageElement,
  FileUploadItemPreviewImageProps
>(ArkFileUpload.ItemPreviewImage, "itemPreviewImage", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export interface FileUploadItemSizeTextProps
  extends HTMLChakraProps<"span", ArkFileUpload.ItemSizeTextProps> {}

export const FileUploadItemSizeText = withContext<
  HTMLSpanElement,
  FileUploadItemSizeTextProps
>(ArkFileUpload.ItemSizeText, "itemSizeText", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export interface FileUploadLabelProps
  extends HTMLChakraProps<"label", ArkFileUpload.LabelProps> {}

export const FileUploadLabel = withContext<
  HTMLLabelElement,
  FileUploadLabelProps
>(ArkFileUpload.Label, "label", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export interface FileUploadTriggerProps
  extends HTMLChakraProps<"button", ArkFileUpload.TriggerProps> {}

export const FileUploadTrigger = withContext<
  HTMLButtonElement,
  FileUploadTriggerProps
>(ArkFileUpload.Trigger, "trigger", { forwardAsChild: true })
