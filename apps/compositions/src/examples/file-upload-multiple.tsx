import { Button, FileUpload } from "@sh3yk0-ui/react"
import { HiUpload } from "react-icons/hi"

export const FileUploadMultiple = () => {
  return (
    <FileUpload.Root maxFiles={5}>
      <FileUpload.HiddenInput />
      <FileUpload.Trigger asChild>
        <Button variant="outline" size="sm">
          <HiUpload /> Upload file
        </Button>
      </FileUpload.Trigger>
      <FileUpload.List showSize clearable />
    </FileUpload.Root>
  )
}
