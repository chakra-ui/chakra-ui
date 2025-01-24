"use client"

import {
  Button,
  Code,
  FileUploadHiddenInput,
  FileUploadRootProvider,
  Stack,
  useFileUpload,
} from "@chakra-ui/react"
import { FileUploadList, FileUploadTrigger } from "compositions/ui/file-upload"
import { HiUpload } from "react-icons/hi"

export const FileUploadWithStore = () => {
  const fileUpload = useFileUpload({
    maxFiles: 1,
    maxFileSize: 3000,
  })

  const accepted = fileUpload.acceptedFiles.map((file) => file.name)
  const rejected = fileUpload.rejectedFiles.map((e) => e.file.name)

  return (
    <Stack align="flex-start">
      <Code colorPalette="green">accepted: {accepted.join(", ")}</Code>
      <Code colorPalette="red">rejected: {rejected.join(", ")}</Code>
      <FileUploadRootProvider value={fileUpload}>
        <FileUploadHiddenInput />
        <FileUploadTrigger asChild>
          <Button variant="outline" size="sm">
            <HiUpload /> Upload file
          </Button>
        </FileUploadTrigger>
        <FileUploadList />
      </FileUploadRootProvider>
    </Stack>
  )
}
