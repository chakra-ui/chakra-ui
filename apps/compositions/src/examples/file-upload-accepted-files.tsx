import { Button } from "compositions/ui/button"
import { FileUploadRoot, FileUploadTrigger } from "compositions/ui/file-button"
import { HiUpload } from "react-icons/hi"

export const FileUploadAcceptedFiles = () => {
  return (
    <FileUploadRoot accept={["image/png"]}>
      <FileUploadTrigger asChild>
        <Button variant="outline" size="sm">
          <HiUpload /> Upload file
        </Button>
      </FileUploadTrigger>
    </FileUploadRoot>
  )
}
