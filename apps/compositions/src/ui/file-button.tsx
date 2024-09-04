"use client"

import {
  FileUpload as ChakraFileUpload,
  Icon,
  IconButton,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react"
import { forwardRef } from "react"
import { RiDeleteBinLine, RiFileLine, RiUploadLine } from "react-icons/ri"

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

export const FileUploadTrigger = ChakraFileUpload.Trigger

export const FileUploadDropzone = forwardRef<
  HTMLInputElement,
  ChakraFileUpload.DropzoneProps
>(function FileUploadDropzone(props, ref) {
  const { children, ...rest } = props
  return (
    <ChakraFileUpload.Dropzone ref={ref} {...rest}>
      <Icon fontSize="xl" color="fg.subtle">
        <RiUploadLine />
      </Icon>
      <VStack gap="1" mt="1">
        <div>
          Drag and drop here or{" "}
          <ChakraFileUpload.Trigger color="blue.solid">
            Choose file to upload
          </ChakraFileUpload.Trigger>
        </div>
        <Text fontSize="sm" color="fg.subtle">
          .png, .jpg up to 5MB
        </Text>
      </VStack>
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
        <Icon fontSize="lg" color="fg.subtle">
          <RiFileLine />
        </Icon>
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
            <RiDeleteBinLine />
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
