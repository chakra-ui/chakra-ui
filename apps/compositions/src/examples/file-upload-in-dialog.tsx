import { Button, Dialog, Portal } from "@chakra-ui/react"
import {
  FileUploadDropzone,
  FileUploadList,
  FileUploadRoot,
} from "compositions/ui/file-upload"

export const FileUploadInDialog = () => {
  return (
    <Dialog.Root size="sm" placement="center">
      <Dialog.Trigger asChild>
        <Button variant="outline">Open Dialog</Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header spaceY="1">
              <Dialog.Title>Upload File</Dialog.Title>
              <Dialog.Description>
                Upload a file to the server
              </Dialog.Description>
            </Dialog.Header>
            <Dialog.Body pb="6">
              <FileUploadRoot>
                <FileUploadDropzone
                  width="full"
                  label="Drag and drop files here"
                />
                <FileUploadList />
              </FileUploadRoot>
            </Dialog.Body>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  )
}
