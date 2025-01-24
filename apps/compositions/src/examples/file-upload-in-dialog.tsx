import { Button } from "@chakra-ui/react"
import {
  DialogBody,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "compositions/ui/dialog"
import {
  FileUploadDropzone,
  FileUploadList,
  FileUploadRoot,
} from "compositions/ui/file-upload"

export const FileUploadInDialog = () => {
  return (
    <DialogRoot size="sm" placement="center">
      <DialogTrigger asChild>
        <Button variant="outline">Open Dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader spaceY="1">
          <DialogTitle>Upload File</DialogTitle>
          <DialogDescription>Upload a file to the server</DialogDescription>
        </DialogHeader>
        <DialogBody pb="6">
          <FileUploadRoot>
            <FileUploadDropzone width="full" label="Drag and drop files here" />
            <FileUploadList />
          </FileUploadRoot>
        </DialogBody>
      </DialogContent>
    </DialogRoot>
  )
}
