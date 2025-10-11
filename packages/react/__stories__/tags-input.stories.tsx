import type { Meta } from "@storybook/react-vite"
import { Box } from "../src"

export default {
  title: "Components / Tags Input",
  decorators: [
    (Story) => (
      <Box p="10">
        <Story />
      </Box>
    ),
  ],
} satisfies Meta

export { TagsInputBasic as Basic } from "compositions/examples/tags-input-basic"
export { TagsInputControlled as Controlled } from "compositions/examples/tags-input-controlled"
export { TagsInputEditable as Editable } from "compositions/examples/tags-input-editable"
export { TagsInputDisabled as Disabled } from "compositions/examples/tags-input-disabled"
export { TagsInputExplorer as Explorer } from "compositions/examples/tags-input-explorer"
export { TagsInputMaxTags as MaxTags } from "compositions/examples/tags-input-max-tags"
export { TagsInputReadOnly as ReadOnly } from "compositions/examples/tags-input-read-only"
export { TagsInputValidation as Validation } from "compositions/examples/tags-input-validation"
export { TagsInputWithBlur as Blur } from "compositions/examples/tags-input-with-blur"
export { TagsInputWithColors as Colors } from "compositions/examples/tags-input-with-colors"
export { TagsInputWithDelimiter as Delimiter } from "compositions/examples/tags-input-with-delimiter"
export { TagsInputWithPaste as Paste } from "compositions/examples/tags-input-with-paste"
export { TagsInputWithStore as Store } from "compositions/examples/tags-input-with-store"
