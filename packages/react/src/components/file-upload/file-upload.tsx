"use client"

import type { Assign } from "@ark-ui/react"
import {
  FileUpload as ArkFileUpload,
  useFileUploadContext,
} from "@ark-ui/react/file-upload"
import { forwardRef, useMemo, useRef } from "react"
import {
  type HTMLChakraProps,
  type SlotRecipeProps,
  type UnstyledProp,
  createSlotRecipeContext,
} from "../../styled-system"
import { For } from "../for"
import { CloseIcon, FileIcon } from "../icons"
import { Span } from "../span"

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
  extends HTMLChakraProps<"button">,
    UnstyledProp {}

export const FileUploadClearTrigger = withContext<
  HTMLButtonElement,
  FileUploadClearTriggerProps
>(ArkFileUpload.ClearTrigger, "clearTrigger", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export interface FileUploadDropzoneProps
  extends HTMLChakraProps<"li", ArkFileUpload.DropzoneBaseProps>,
    UnstyledProp {}

const DropzoneBase = withContext<
  HTMLDivElement,
  FileUploadDropzoneProps
>(ArkFileUpload.Dropzone, "dropzone", { forwardAsChild: true })

export const FileUploadDropzone = forwardRef<
  HTMLDivElement,
  FileUploadDropzoneProps
>(function FileUploadDropzone(props, ref) {
  const { onClick, disableClick, ...rest } = props
  const dropzoneRef = useRef<HTMLDivElement>(null)

  // Combine refs using a callback
  const setRef = (node: HTMLDivElement | null) => {
    dropzoneRef.current = node
    if (typeof ref === "function") {
      ref(node)
    } else if (ref) {
      ref.current = node
    }
  }

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    // If disableClick is true, don't handle the click
    if (disableClick) {
      onClick?.(event)
      return
    }

    // Check if the click target is a child of the dropzone (not the dropzone itself)
    const target = event.target as HTMLElement
    const dropzoneElement = dropzoneRef.current

    if (!dropzoneElement) {
      onClick?.(event)
      return
    }

    // Check if the click is on a child element (not the dropzone itself)
    const isClickOnChild = target !== dropzoneElement && dropzoneElement.contains(target)

    if (isClickOnChild) {
      // Check if the click is on a button or trigger (which should not trigger the file input)
      const isClickOnButton = target.closest("button") !== null
      const isClickOnTrigger = target.closest('[data-part="trigger"]') !== null

      // If clicking on a button or trigger, let it handle the click normally
      if (isClickOnButton || isClickOnTrigger) {
        onClick?.(event)
        return
      }

      // Find the hidden input element within the file upload root
      // First try to find by data-scope attribute, then by traversing up the DOM tree
      let rootElement = dropzoneElement.closest('[data-scope="file-upload"]')
      
      // If not found by data-scope, try to find the root by looking for the hidden input's parent
      if (!rootElement) {
        // Traverse up to find a common ancestor that might contain the hidden input
        let parent = dropzoneElement.parentElement
        while (parent) {
          const hiddenInput = parent.querySelector('input[type="file"]')
          if (hiddenInput) {
            rootElement = parent
            break
          }
          parent = parent.parentElement
        }
      }

      if (rootElement) {
        const hiddenInput = rootElement.querySelector(
          'input[type="file"]'
        ) as HTMLInputElement | null

        if (hiddenInput) {
          // Trigger the file input click
          hiddenInput.click()
          // Prevent the event from bubbling to avoid double-triggering
          // Note: We stop propagation only for child clicks we handle
          event.stopPropagation()
          event.preventDefault()
          // Don't call onClick here since we've handled it
          return
        }
      }
    }

    // For clicks on the dropzone itself, let the Ark UI handler work normally
    // and also call the user's onClick handler if provided
    onClick?.(event)
  }

  return (
    <DropzoneBase
      ref={setRef}
      {...rest}
      disableClick={disableClick}
      onClick={handleClick}
    />
  )
})

////////////////////////////////////////////////////////////////////////////////////

export interface FileUploadDropzoneContentProps
  extends HTMLChakraProps<"div">,
    UnstyledProp {}

export const FileUploadDropzoneContent = withContext<
  HTMLDivElement,
  FileUploadDropzoneContentProps
>("div", "dropzoneContent")

////////////////////////////////////////////////////////////////////////////////////

export interface FileUploadItemProps
  extends HTMLChakraProps<"li", ArkFileUpload.ItemBaseProps>,
    UnstyledProp {}

export const FileUploadItem = withContext<HTMLLIElement, FileUploadItemProps>(
  ArkFileUpload.Item,
  "item",
  { forwardAsChild: true },
)

////////////////////////////////////////////////////////////////////////////////////

export interface FileUploadItemContentProps
  extends HTMLChakraProps<"div">,
    UnstyledProp {}

export const FileUploadItemContent = withContext<
  HTMLDivElement,
  FileUploadItemContentProps
>("div", "itemContent")

////////////////////////////////////////////////////////////////////////////////////

export interface FileUploadItemDeleteTriggerProps
  extends HTMLChakraProps<"button", ArkFileUpload.ItemDeleteTriggerBaseProps>,
    UnstyledProp {}

export const FileUploadItemDeleteTrigger = withContext<
  HTMLButtonElement,
  FileUploadItemDeleteTriggerProps
>(ArkFileUpload.ItemDeleteTrigger, "itemDeleteTrigger", {
  forwardAsChild: true,
  defaultProps: {
    children: <CloseIcon />,
  },
})

////////////////////////////////////////////////////////////////////////////////////

export interface FileUploadItemGroupProps
  extends HTMLChakraProps<"ul", ArkFileUpload.ItemGroupBaseProps>,
    UnstyledProp {}

export const FileUploadItemGroup = withContext<
  HTMLUListElement,
  FileUploadItemGroupProps
>(ArkFileUpload.ItemGroup, "itemGroup", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export interface FileUploadItemNameProps
  extends HTMLChakraProps<"span", ArkFileUpload.ItemNameBaseProps>,
    UnstyledProp {}

export const FileUploadItemName = withContext<
  HTMLSpanElement,
  FileUploadItemNameProps
>(ArkFileUpload.ItemName, "itemName", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export interface FileUploadItemPreviewProps
  extends HTMLChakraProps<"div", ArkFileUpload.ItemPreviewBaseProps>,
    UnstyledProp {}

export const FileUploadItemPreview = withContext<
  HTMLDivElement,
  FileUploadItemPreviewProps
>(ArkFileUpload.ItemPreview, "itemPreview", {
  forwardAsChild: true,
  defaultProps: {
    children: <FileIcon />,
  },
})

////////////////////////////////////////////////////////////////////////////////////

export interface FileUploadItemPreviewImageProps
  extends HTMLChakraProps<"img", ArkFileUpload.ItemPreviewImageBaseProps>,
    UnstyledProp {}

export const FileUploadItemPreviewImage = withContext<
  HTMLImageElement,
  FileUploadItemPreviewImageProps
>(ArkFileUpload.ItemPreviewImage, "itemPreviewImage", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export interface FileUploadItemSizeTextProps
  extends HTMLChakraProps<"span", ArkFileUpload.ItemSizeTextBaseProps>,
    UnstyledProp {}

export const FileUploadItemSizeText = withContext<
  HTMLSpanElement,
  FileUploadItemSizeTextProps
>(ArkFileUpload.ItemSizeText, "itemSizeText", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export interface FileUploadLabelProps
  extends HTMLChakraProps<"label", ArkFileUpload.LabelBaseProps>,
    UnstyledProp {}

export const FileUploadLabel = withContext<
  HTMLLabelElement,
  FileUploadLabelProps
>(ArkFileUpload.Label, "label", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export interface FileUploadTriggerProps
  extends HTMLChakraProps<"button", ArkFileUpload.TriggerBaseProps>,
    UnstyledProp {}

export const FileUploadTrigger = withContext<
  HTMLButtonElement,
  FileUploadTriggerProps
>(ArkFileUpload.Trigger, "trigger", { forwardAsChild: true })

////////////////////////////////////////////////////////////////////////////////////

export interface FileUploadItemsBaseProps {
  showSize?: boolean | undefined
  clearable?: boolean | undefined
  files?: File[] | undefined
}

export interface FileUploadItemsProps
  extends Omit<FileUploadItemProps, "file">,
    FileUploadItemsBaseProps {}

export const FileUploadItems = (props: FileUploadItemsProps) => {
  const { showSize, clearable, files, ...rest } = props
  const fileUpload = useFileUploadContext()
  const acceptedFiles = files ?? fileUpload.acceptedFiles
  return (
    <For each={acceptedFiles}>
      {(file) => (
        <FileUploadItem file={file} key={file.name} {...rest}>
          <FileUploadItemPreview />
          {showSize ? (
            <FileUploadItemContent>
              <FileUploadItemName />
              <FileUploadItemSizeText />
            </FileUploadItemContent>
          ) : (
            <FileUploadItemName flex="1" />
          )}
          {clearable && <FileUploadItemDeleteTrigger />}
        </FileUploadItem>
      )}
    </For>
  )
}

////////////////////////////////////////////////////////////////////////////////////

export interface FileUploadListProps extends FileUploadItemsBaseProps {}

export const FileUploadList = forwardRef<HTMLUListElement, FileUploadListProps>(
  function FileUploadList(props, ref) {
    const { showSize, clearable, files, ...rest } = props
    return (
      <FileUploadItemGroup ref={ref} {...rest}>
        <FileUploadItems
          showSize={showSize}
          clearable={clearable}
          files={files}
        />
      </FileUploadItemGroup>
    )
  },
)

////////////////////////////////////////////////////////////////////////////////////

export interface FileUploadFileTextProps extends HTMLChakraProps<"span"> {
  fallback?: string | undefined
}

export const FileUploadFileText = forwardRef<
  HTMLSpanElement,
  FileUploadFileTextProps
>(function FileUploadFileText(props, ref) {
  const { fallback = "Select file(s)", ...rest } = props

  const fileUpload = useFileUploadContext()
  const styles = useFileUploadStyles()

  const acceptedFiles = fileUpload.acceptedFiles

  const fileText = useMemo(() => {
    if (acceptedFiles.length === 1) {
      return acceptedFiles[0].name
    }
    if (acceptedFiles.length > 1) {
      return `${acceptedFiles.length} files`
    }
    return fallback
  }, [acceptedFiles, fallback])

  return (
    <Span
      ref={ref}
      data-placeholder={fileText === fallback ? "" : undefined}
      data-scope="file-upload"
      data-part="file-text"
      {...rest}
      css={[styles.fileText, props.css]}
    >
      {fileText}
    </Span>
  )
})

////////////////////////////////////////////////////////////////////////////////////

export const FileUploadContext = ArkFileUpload.Context
export const FileUploadHiddenInput = ArkFileUpload.HiddenInput

export interface FileUploadFileAcceptDetails
  extends ArkFileUpload.FileAcceptDetails {}

export interface FileUploadFileRejectDetails
  extends ArkFileUpload.FileRejectDetails {}

export interface FileUploadFileChangeDetails
  extends ArkFileUpload.FileChangeDetails {}
