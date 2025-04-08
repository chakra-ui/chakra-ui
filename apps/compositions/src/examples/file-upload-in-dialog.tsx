import { Button, Dialog, FileUpload, Icon, Portal } from "@chakra-ui/react"
import { LuUpload } from "react-icons/lu"

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
            <Dialog.Header>
              <Dialog.Title>Upload File</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body pb="6">
              <Dialog.Description mb="4">
                Here's a dialog with a file dropzone component.
              </Dialog.Description>
              <FileUpload.Root>
                <FileUpload.HiddenInput />
                <FileUpload.Dropzone width="full">
                  <Icon size="xl" color="fg.muted">
                    <LuUpload />
                  </Icon>
                  <FileUpload.DropzoneContent>
                    Drag and drop files here
                  </FileUpload.DropzoneContent>
                </FileUpload.Dropzone>
                <FileUpload.List />
              </FileUpload.Root>
            </Dialog.Body>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  )
}
