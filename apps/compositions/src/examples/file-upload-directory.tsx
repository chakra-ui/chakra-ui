import { Button } from "compositions/ui/button"
import {
  FileUploadList,
  FileUploadRoot,
  FileUploadTrigger,
} from "compositions/ui/file-button"
import { HiUpload } from "react-icons/hi"

export const FileUploadDirectory = () => {
  return (
    <FileUploadRoot directory>
      <FileUploadTrigger>
        <Button variant="outline" size="sm" startIcon={<HiUpload />}>
          Upload file
        </Button>
      </FileUploadTrigger>
      <FileUploadList />
    </FileUploadRoot>
  )
}
