import {
  FileUploadDropzone,
  FileUploadList,
  FileUploadRoot,
} from "compositions/ui/file-button"

export const FileUploadWithDropzone = () => {
  return (
    <FileUploadRoot alignItems="stretch" maxFiles={10}>
      <FileUploadDropzone />
      <FileUploadList />
    </FileUploadRoot>
  )
}
