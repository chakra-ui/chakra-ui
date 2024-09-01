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
export { TextareaWithAutoresize as WithAutoresize } from "compositions/examples/textarea-with-autoresize"
export { TextareaWithErrorText as WithErrorText } from "compositions/examples/textarea-with-error-text"
export { TextareaWithField as WithField } from "compositions/examples/textarea-with-field"
export { TextareaWithForm as WithForm } from "compositions/examples/textarea-with-form"
export { TextareaWithHelperText as WithHelperText } from "compositions/examples/textarea-with-helper-text"
export { TextareaWithHookForm as HookForm } from "compositions/examples/textarea-with-hook-form"
export { TextareaWithResize as WithResize } from "compositions/examples/textarea-with-resize"
