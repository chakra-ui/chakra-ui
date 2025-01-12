import type { Meta } from "@storybook/react"
import { Box } from "../src"

export default {
  title: "Components / Textarea",
  decorators: [
    (Story) => (
      <Box p="10">
        <Story />
      </Box>
    ),
  ],
} satisfies Meta

export { TextareaBasic as Basic } from "compositions/examples/textarea-basic"
export { TextareaSizeTable as Sizes } from "compositions/examples/textarea-size-table"
export { TextareaVariantTable as Variants } from "compositions/examples/textarea-variant-table"
export { TextareaWithAutoresize as Autoresize } from "compositions/examples/textarea-with-autoresize"
export { TextareaWithAutoresizeMaxRows as AutoresizeMaxRows } from "compositions/examples/textarea-with-autoresize-max-rows"
export { TextareaWithErrorText as ErrorText } from "compositions/examples/textarea-with-error-text"
export { TextareaWithField as Field } from "compositions/examples/textarea-with-field"
export { TextareaWithForm as Form } from "compositions/examples/textarea-with-form"
export { TextareaWithHelperText as HelperText } from "compositions/examples/textarea-with-helper-text"
export { TextareaWithHookForm as HookForm } from "compositions/examples/textarea-with-hook-form"
export { TextareaWithResize as Resize } from "compositions/examples/textarea-with-resize"
