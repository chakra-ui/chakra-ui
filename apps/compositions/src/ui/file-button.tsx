"use client"

import {
  FileUpload as ChakraFileUpload,
  IconButton,
  Square,
  Stack,
  Text,
} from "@chakra-ui/react"
import { forwardRef } from "react"
import { LuFile, LuTrash2 } from "react-icons/lu"

export interface FileUploadRootProps extends ChakraFileUpload.RootProps {
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>
}

export const FileUploadRoot = forwardRef<HTMLInputElement, FileUploadRootProps>(
  function FileUploadRoot(props, ref) {
    const { children, inputProps, ...rest } = props
    return (
      <ChakraFileUpload.Root alignItems="flex-start" {...rest}>
        <ChakraFileUpload.HiddenInput ref={ref} {...inputProps} />
        {children}
      </ChakraFileUpload.Root>
    )
  },
)

export const FileUploadTrigger = forwardRef<
  HTMLButtonElement,
  ChakraFileUpload.TriggerProps
>(function FileButton(props, ref) {
  return <ChakraFileUpload.Trigger ref={ref} {...props} asChild />
})

export const FileUploadDropzone = forwardRef<
  HTMLInputElement,
  ChakraFileUpload.DropzoneProps
>(function FileDropzone(props, ref) {
  const { children, ...rest } = props
  return (
    <ChakraFileUpload.Dropzone ref={ref} {...rest}>
      <Square size="10" bg="bg" rounded="sm" borderWidth="1px">
        <LuFile />
      </Square>
      <div>
        Drag and drop your files here or{" "}
        <ChakraFileUpload.Trigger color="blue.500">
          click to browse
        </ChakraFileUpload.Trigger>
      </div>
      <Text fontSize="sm" color="fg.muted">
        .png, .jpg up to 5MB
      </Text>
      {children}
    </ChakraFileUpload.Dropzone>
  )
})

interface VisibilityProps {
  showSize?: boolean
  showDelete?: boolean
}

interface FileUploadItemProps extends VisibilityProps {
  file: File
}

const FileUploadItem = (props: FileUploadItemProps) => {
  const { file, showSize, showDelete } = props
  return (
    <ChakraFileUpload.Item file={file}>
      <ChakraFileUpload.ItemPreview asChild>
        <Square
          size="10"
          bg="bg.muted"
          rounded="sm"
          fontSize="lg"
          color="fg.muted"
        >
          <LuFile />
        </Square>
      </ChakraFileUpload.ItemPreview>

      {showSize ? (
        <Stack gap="0.5" flex="1" pe="4">
          <ChakraFileUpload.ItemName lineClamp="1" />
          <ChakraFileUpload.ItemSizeText />
        </Stack>
      ) : (
        <ChakraFileUpload.ItemName lineClamp="1" flex="1" pe="4" />
      )}

      {showDelete && (
        <ChakraFileUpload.ItemDeleteTrigger asChild>
          <IconButton variant="ghost" color="fg.muted">
            <LuTrash2 />
          </IconButton>
        </ChakraFileUpload.ItemDeleteTrigger>
      )}
    </ChakraFileUpload.Item>
  )
}

interface FileUploadListProps
  extends VisibilityProps,
    ChakraFileUpload.ItemGroupProps {}

export const FileUploadList = (props: FileUploadListProps) => {
  const { showSize, showDelete, ...rest } = props
  return (
    <ChakraFileUpload.Context>
      {({ acceptedFiles }) => {
        if (acceptedFiles.length === 0) return null
        return (
          <ChakraFileUpload.ItemGroup {...rest}>
            {acceptedFiles.map((file) => (
              <FileUploadItem
                key={file.name}
                file={file}
                showSize={showSize}
                showDelete={showDelete}
              />
            ))}
          </ChakraFileUpload.ItemGroup>
        )
      }}
    </ChakraFileUpload.Context>
  )
}
