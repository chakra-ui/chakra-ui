"use client"

import {
  Button,
  Code,
  FileUpload,
  Stack,
  useFileUpload,
} from "@chakra-ui/react"
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
      <FileUpload.RootProvider value={fileUpload}>
        <FileUpload.HiddenInput />
        <FileUpload.Trigger asChild>
          <Button variant="outline" size="sm">
            <HiUpload /> Upload file
          </Button>
        </FileUpload.Trigger>
        <FileUpload.List />
      </FileUpload.RootProvider>
    </Stack>
  )
}
