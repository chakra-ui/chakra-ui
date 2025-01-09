"use client"

import {
  FileUpload,
  FileUploadItemPreviewImage,
  Float,
  HStack,
  Input,
  type InputProps,
  useFileUploadContext,
} from "@chakra-ui/react"
import { HiX } from "react-icons/hi"

const FilePasteInput = (props: InputProps) => {
  const fileUpload = useFileUploadContext()
  return (
    <Input
      {...props}
      onPaste={(e) => {
        fileUpload.setClipboardFiles(e.clipboardData)
      }}
    />
  )
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
    <FileUpload.Root maxFiles={3} accept="image/*">
      <FileUpload.HiddenInput />
      <FileImageList />
      <FilePasteInput placeholder="Paste image here..." />
    </FileUpload.Root>
  )
}
