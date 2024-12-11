import {
  FileUploadDropzone,
  FileUploadList,
  FileUploadRoot,
} from "compositions/ui/file-upload"

export const FileUploadWithDropzone = () => {
  return (
    <FileUploadRoot maxW="xl" alignItems="stretch" maxFiles={10}>
      <FileUploadDropzone
        label="Drag and drop here to upload"
        description=".png, .jpg up to 5MB"
      />
      <FileUploadList />
    </FileUploadRoot>
  )
}
