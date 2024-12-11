import { Button } from "compositions/ui/button"
import {
  FileUploadList,
  FileUploadRoot,
  FileUploadTrigger,
} from "compositions/ui/file-upload"
import { HiUpload } from "react-icons/hi"

export const FileUploadBasic = () => {
  return (
    <FileUploadRoot>
      <FileUploadTrigger asChild>
        <Button variant="outline" size="sm">
          <HiUpload /> Upload file
        </Button>
      </FileUploadTrigger>
      <FileUploadList />
    </FileUploadRoot>
  )
}
