import { FileUpload, Input } from "@chakra-ui/react"

export const FileUploadWithInput = () => {
  return (
    <FileUpload.Root gap="1" maxWidth="300px">
      <FileUpload.HiddenInput />
      <FileUpload.Label>Upload file</FileUpload.Label>
      <Input asChild>
        <FileUpload.Trigger>
          <FileUpload.FileText />
        </FileUpload.Trigger>
      </Input>
    </FileUpload.Root>
  )
}
