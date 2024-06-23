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

export interface FileButtonProps extends ChakraFileUpload.RootProps {
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>
  rootRef?: React.Ref<HTMLDivElement>
}

export const FileButton = forwardRef<HTMLInputElement, FileButtonProps>(
  function FileButton(props, ref) {
    const { children, inputProps, rootRef, ...rest } = props
    return (
      <ChakraFileUpload.Root alignItems="flex-start" ref={rootRef} {...rest}>
        <ChakraFileUpload.HiddenInput ref={ref} {...inputProps} />
        <ChakraFileUpload.Trigger asChild>{children}</ChakraFileUpload.Trigger>
        <FileUploadList showSize showDelete />
      </ChakraFileUpload.Root>
    )
  },
)

export const FileDropzone = forwardRef<HTMLInputElement, FileButtonProps>(
  function FileDropzone(props, ref) {
    const { children, inputProps, rootRef, ...rest } = props
    return (
      <ChakraFileUpload.Root ref={rootRef} {...rest}>
        <ChakraFileUpload.HiddenInput ref={ref} {...inputProps} />
        <ChakraFileUpload.Dropzone>
          <Square size="10" bg="bg" rounded="sm" borderWidth="1px">
            <LuFile />
          </Square>
          <div>
            Drag and drop your files here or{" "}
            <ChakraFileUpload.Trigger color="blue.500">
              click to browse
            </ChakraFileUpload.Trigger>
          </div>
          <Text fontSize="sm" color="fg.subtle">
            .png, .jpg up to 5MB
          </Text>
          {children}
        </ChakraFileUpload.Dropzone>
        <FileUploadList showSize showDelete />
      </ChakraFileUpload.Root>
    )
  },
)

interface VisiblityProps {
  showSize?: boolean
  showDelete?: boolean
}

interface ItemProps extends VisiblityProps {
  file: File
}

const FileUploadItem = (props: ItemProps) => {
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
          <IconButton variant="ghost" color="fg.subtle">
            <LuTrash2 />
          </IconButton>
        </ChakraFileUpload.ItemDeleteTrigger>
      )}
    </ChakraFileUpload.Item>
  )
}

interface ListProps extends VisiblityProps, ChakraFileUpload.ItemGroupProps {}

const FileUploadList = (props: ListProps) => {
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
