import { Button } from "compositions/ui/button"
import {
  FileUploadList,
  FileUploadRoot,
  FileUploadTrigger,
} from "compositions/ui/file-button"
import { HiCamera } from "react-icons/hi"

export const FileUploadMediaCapture = () => {
  return (
    <FileUploadRoot capture="environment">
      <FileUploadTrigger asChild>
        <Button variant="outline" size="sm">
          <HiCamera /> Open Camera
        </Button>
      </FileUploadTrigger>
      <FileUploadList />
    </FileUploadRoot>
  )
}
