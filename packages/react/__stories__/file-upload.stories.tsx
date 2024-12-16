import type { Meta } from "@storybook/react"
import { Box } from "../src"

export default {
  title: "Components / File Upload",
  decorators: [
    (Story) => (
      <Box p="10">
        <Story />
      </Box>
    ),
  ],
} satisfies Meta

export { FileUploadAcceptedFiles as AcceptedFiles } from "compositions/examples/file-upload-accepted-files"
export { FileUploadBasic as Basic } from "compositions/examples/file-upload-basic"
export { FileUploadDirectory as Directory } from "compositions/examples/file-upload-directory"
export { FileUploadInDialog as Dialog } from "compositions/examples/file-upload-in-dialog"
export { FileUploadMediaCapture as MediaCapture } from "compositions/examples/file-upload-media-capture"
export { FileUploadMultiple as Multiple } from "compositions/examples/file-upload-multiple"
export { FileUploadWithDropzone as Dropzone } from "compositions/examples/file-upload-with-dropzone"
export { FileUploadWithHookForm as HookForm } from "compositions/examples/file-upload-with-hook-form"
export { FileUploadWithInput as Input } from "compositions/examples/file-upload-with-input"
export { FileUploadWithInputClear as InputClear } from "compositions/examples/file-upload-with-input-clear"
export { FileUploadWithPasteEvent as PasteEvent } from "compositions/examples/file-upload-with-paste-event"
export { FileUploadWithStore as Store } from "compositions/examples/file-upload-with-store"
