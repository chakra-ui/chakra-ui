import { Button, FileUpload } from "@sh3yk0-ui/react"
import { HiUpload } from "react-icons/hi"

export const FileUploadBasic = () => {
  return (
    <FileUpload.Root>
      <FileUpload.HiddenInput />
      <FileUpload.Trigger asChild>
        <Button variant="outline" size="sm">
          <HiUpload /> Upload file
        </Button>
      </FileUpload.Trigger>
      <FileUpload.List />
    </FileUpload.Root>
  )
}
