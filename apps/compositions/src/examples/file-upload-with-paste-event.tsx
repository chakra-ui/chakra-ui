import {
  FileUpload,
  FileUploadItemPreviewImage,
  Float,
  HStack,
  Input,
  useFileUploadContext,
} from "@chakra-ui/react"
import { FileUploadRoot } from "compositions/ui/file-upload"
import * as React from "react"
import { HiX } from "react-icons/hi"

const FilePasteInput = (props: React.PropsWithChildren) => {
  const fileUpload = useFileUploadContext()

  const handleFilePaste = (e: React.ClipboardEvent<HTMLDivElement>) => {
    const items = Array.from(e.clipboardData?.items ?? [])
    const files = items.reduce<File[]>((acc, item) => {
      if (item.kind !== "file") return acc
      return [...acc, item.getAsFile()!]
    }, [])
    if (!files.length) return
    e.preventDefault()
    fileUpload.setFiles([...fileUpload.acceptedFiles, ...files])
  }

  const child = React.Children.only(props.children)
  if (!React.isValidElement(child)) return

  return React.cloneElement(child as React.ReactElement, {
    onPaste: (e: React.ClipboardEvent<HTMLDivElement>) => {
      handleFilePaste(e)
      child.props.onPaste?.(e)
    },
  })
}

const FileImageList = () => {
  const fileUpload = useFileUploadContext()
  return (
    <HStack wrap="wrap" gap="3">
      {fileUpload.acceptedFiles.map((file) => (
        <FileUpload.Item
          p="2"
          width="auto"
          key={file.name}
          file={file}
          pos="relative"
        >
          <Float placement="top-start">
            <FileUpload.ItemDeleteTrigger
              p="0.5"
              rounded="l1"
              bg="bg"
              borderWidth="1px"
            >
              <HiX />
            </FileUpload.ItemDeleteTrigger>
          </Float>
          <FileUploadItemPreviewImage
            boxSize="12"
            rounded="l1"
            objectFit="cover"
          />
        </FileUpload.Item>
      ))}
    </HStack>
  )
}

export const FileUploadWithPasteEvent = () => {
  return (
    <FileUploadRoot maxFiles={3} accept="image/*">
      <FileImageList />
      <FilePasteInput>
        <Input placeholder="Paste file here..." />
      </FilePasteInput>
    </FileUploadRoot>
  )
}
