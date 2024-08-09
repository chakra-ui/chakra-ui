import { Box } from "../src"

export default {
  title: "Components / Textarea",
  decorators: [
    (Story: any) => (
      <Box padding="40px">
        <Story />
      </Box>
    ),
  ],
}

export { TextareaBasic as Basic } from "compositions/examples/textarea-basic"
export { TextareaWithAutoresize as WithAutoresize } from "compositions/examples/textarea-with-autoresize"
export { TextareaWithErrorText as WithErrorText } from "compositions/examples/textarea-with-error-text"
export { TextareaWithField as WithField } from "compositions/examples/textarea-with-field"
export { TextareaWithHelperText as WithHelperText } from "compositions/examples/textarea-with-helper-text"
export { TextareaWithResize as WithResize } from "compositions/examples/textarea-with-resize"
export { TextareaVariantTable as Variants } from "compositions/examples/textarea-variant-table"
export { TextareaSizeTable as Sizes } from "compositions/examples/textarea-size-table"
export { TextareaWithForm as WithForm } from "compositions/examples/textarea-with-form"
