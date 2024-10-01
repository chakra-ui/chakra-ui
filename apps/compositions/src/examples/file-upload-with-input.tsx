import {
  FileInput,
  FileUploadLabel,
  FileUploadRoot,
} from "compositions/ui/file-button"

export const FileUploadWithInput = () => {
  return (
    <FileUploadRoot gap="1" maxWidth="300px">
      <FileUploadLabel>Upload file</FileUploadLabel>
      <FileInput />
    </FileUploadRoot>
  )
}
