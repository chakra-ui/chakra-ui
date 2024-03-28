import {
  FileUpload as ArkFileUpload,
  FileUploadDropzoneProps as ArkFileUploadDropzoneProps,
  FileUploadItemDeleteTriggerProps as ArkFileUploadItemDeleteTriggerProps,
  FileUploadItemGroupProps as ArkFileUploadItemGroupProps,
  FileUploadItemNameProps as ArkFileUploadItemNameProps,
  FileUploadItemPreviewImageProps as ArkFileUploadItemPreviewImageProps,
  FileUploadItemPreviewProps as ArkFileUploadItemPreviewProps,
  FileUploadItemProps as ArkFileUploadItemProps,
  FileUploadItemSizeTextProps as ArkFileUploadItemSizeTextProps,
  FileUploadLabelProps as ArkFileUploadLabelProps,
  FileUploadRootProps as ArkFileUploadRootProps,
  FileUploadTriggerProps as ArkFileUploadTriggerProps,
} from "@ark-ui/react/file-upload"
import {
  HTMLChakraProps,
  SlotRecipeProps,
  UnstyledProp,
  createStyleContext,
} from "../../styled-system"

////////////////////////////////////////////////////////////////////////////////////

const { withProvider, withContext } = createStyleContext("FileUpload")

////////////////////////////////////////////////////////////////////////////////////

export interface FileUploadRootProps
  extends HTMLChakraProps<"div", ArkFileUploadRootProps>,
    SlotRecipeProps<"FileUpload">,
    UnstyledProp {}

export const FileUploadRoot = withProvider<HTMLDivElement, FileUploadRootProps>(
  ArkFileUpload.Root,
  "root",
)

////////////////////////////////////////////////////////////////////////////////////

export interface FileUploadDropzoneProps
  extends HTMLChakraProps<"li", ArkFileUploadDropzoneProps> {}

export const FileUploadDropzone = withContext<
  HTMLDivElement,
  FileUploadDropzoneProps
>(ArkFileUpload.Dropzone, "dropzone")

////////////////////////////////////////////////////////////////////////////////////

export interface FileUploadItemProps
  extends HTMLChakraProps<"li", ArkFileUploadItemProps> {}

export const FileUploadItem = withContext<HTMLLIElement, FileUploadItemProps>(
  ArkFileUpload.Item,
  "item",
)

////////////////////////////////////////////////////////////////////////////////////

export interface FileUploadItemDeleteTriggerProps
  extends HTMLChakraProps<"button", ArkFileUploadItemDeleteTriggerProps> {}

export const FileUploadItemDeleteTrigger = withContext<
  HTMLButtonElement,
  FileUploadItemDeleteTriggerProps
>(ArkFileUpload.ItemDeleteTrigger, "itemDeleteTrigger")

////////////////////////////////////////////////////////////////////////////////////

export interface FileUploadItemGroupProps
  extends HTMLChakraProps<"ul", ArkFileUploadItemGroupProps> {}

export const FileUploadItemGroup = withContext<
  HTMLUListElement,
  FileUploadItemGroupProps
>(ArkFileUpload.ItemGroup, "itemGroup")

////////////////////////////////////////////////////////////////////////////////////

export interface FileUploadItemNameProps
  extends HTMLChakraProps<"span", ArkFileUploadItemNameProps> {}

export const FileUploadItemName = withContext<
  HTMLSpanElement,
  FileUploadItemNameProps
>(ArkFileUpload.ItemName, "itemName")

////////////////////////////////////////////////////////////////////////////////////

export interface FileUploadItemPreviewProps
  extends HTMLChakraProps<"div", ArkFileUploadItemPreviewProps> {}

export const FileUploadItemPreview = withContext<
  HTMLDivElement,
  FileUploadItemPreviewProps
>(ArkFileUpload.ItemPreview, "itemPreview")

////////////////////////////////////////////////////////////////////////////////////

export interface FileUploadItemPreviewImageProps
  extends HTMLChakraProps<"img", ArkFileUploadItemPreviewImageProps> {}

export const FileUploadItemPreviewImage = withContext<
  HTMLImageElement,
  FileUploadItemPreviewImageProps
>(ArkFileUpload.ItemPreviewImage, "itemPreviewImage")

////////////////////////////////////////////////////////////////////////////////////

export interface FileUploadItemSizeTextProps
  extends HTMLChakraProps<"span", ArkFileUploadItemSizeTextProps> {}

export const FileUploadItemSizeText = withContext<
  HTMLSpanElement,
  FileUploadItemSizeTextProps
>(ArkFileUpload.ItemSizeText, "itemSizeText")

////////////////////////////////////////////////////////////////////////////////////

export interface FileUploadLabelProps
  extends HTMLChakraProps<"label", ArkFileUploadLabelProps> {}

export const FileUploadLabel = withContext<
  HTMLLabelElement,
  FileUploadLabelProps
>(ArkFileUpload.Label, "label")

////////////////////////////////////////////////////////////////////////////////////

export interface FileUploadTriggerProps
  extends HTMLChakraProps<"button", ArkFileUploadTriggerProps> {}

export const FileUploadTrigger = withContext<
  HTMLButtonElement,
  FileUploadTriggerProps
>(ArkFileUpload.Trigger, "trigger")
