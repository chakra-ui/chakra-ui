"use client"

import { Box, FileUpload, Icon, useFileUploadContext } from "@chakra-ui/react"
import { LuUpload } from "react-icons/lu"

const MAX_FILES = 3

const ConditionalDropzone = () => {
  const fileUpload = useFileUploadContext()
  const acceptedFiles = fileUpload.acceptedFiles

  if (acceptedFiles.length >= MAX_FILES) {
    return null
  }

  return (
    <FileUpload.Dropzone>
      <Icon size="md" color="fg.muted">
        <LuUpload />
      </Icon>
      <FileUpload.DropzoneContent>
        <Box>Drag and drop files here</Box>
        <Box color="fg.muted">
          {MAX_FILES - acceptedFiles.length} more file
          {MAX_FILES - acceptedFiles.length !== 1 ? "s" : ""} allowed
        </Box>
      </FileUpload.DropzoneContent>
    </FileUpload.Dropzone>
  )
}

export const FileUploadWithConditionalDropzone = () => {
  return (
    <FileUpload.Root maxW="xl" alignItems="stretch" maxFiles={MAX_FILES}>
      <FileUpload.HiddenInput />
      <ConditionalDropzone />
      <FileUpload.List clearable />
    </FileUpload.Root>
  )
}
