import type { Meta } from "@storybook/react"
import { Box } from "../src"

export default {
  title: "Components / Editable",
  decorators: [
    (Story) => (
      <Box p="10">
        <Story />
      </Box>
    ),
  ],
} satisfies Meta

export { EditableBasic as Basic } from "compositions/examples/editable-basic"
export { EditableControlled as Controlled } from "compositions/examples/editable-controlled"
export { EditableDisabled as Disabled } from "compositions/examples/editable-disabled"
export { EditableWithControls as Controls } from "compositions/examples/editable-with-controls"
export { EditableWithDoubleClick as DoubleClick } from "compositions/examples/editable-with-double-click"
export { EditableWithFinalFocus as FinalFocus } from "compositions/examples/editable-with-final-focus"
export { EditableWithStore as Store } from "compositions/examples/editable-with-store"
export { EditableWithTextarea as Textarea } from "compositions/examples/editable-with-textarea"
