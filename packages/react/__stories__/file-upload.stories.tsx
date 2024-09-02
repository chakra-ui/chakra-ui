import type { Meta } from "@storybook/react"

export default {
  title: "Components / File Upload",
} satisfies Meta

export { FileUploadAcceptedFiles as AcceptedFiles } from "compositions/examples/file-upload-accepted-files"
export { FileUploadBasic as Basic } from "compositions/examples/file-upload-basic"
export { FileUploadDirectory as Directory } from "compositions/examples/file-upload-directory"
export { FileUploadInDialog as Dialog } from "compositions/examples/file-upload-in-dialog"
export { FileUploadMediaCapture as MediaCapture } from "compositions/examples/file-upload-media-capture"
export { FileUploadMultiple as Multiple } from "compositions/examples/file-upload-multiple"
export { FileUploadWithDropzone as Dropzone } from "compositions/examples/file-upload-with-dropzone"
