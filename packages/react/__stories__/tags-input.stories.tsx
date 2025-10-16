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
export { TagsInputDisabled as Disabled } from "compositions/examples/tags-input-disabled"
export { TagsInputEditable as Editable } from "compositions/examples/tags-input-editable"
export { TagsInputExplorer as Explorer } from "compositions/examples/tags-input-explorer"
export { TagsInputInvalid as Invalid } from "compositions/examples/tags-input-invalid"
export { TagsInputReadOnly as ReadOnly } from "compositions/examples/tags-input-read-only"
export { TagsInputValidation as Validation } from "compositions/examples/tags-input-validation"
export { TagsInputWithBlurBehavior as BlurBehavior } from "compositions/examples/tags-input-with-blur-behavior"
export { TagsInputWithColors as Colors } from "compositions/examples/tags-input-with-colors"
export { TagsInputWithCombobox as Combobox } from "compositions/examples/tags-input-with-combobox"
export { TagsInputWithDelimiter as Delimiter } from "compositions/examples/tags-input-with-delimiter"
export { TagsInputWithField as Field } from "compositions/examples/tags-input-with-field"
export { TagsInputWithForm as Form } from "compositions/examples/tags-input-with-form"
export { TagsInputWithMax as Max } from "compositions/examples/tags-input-with-max"
export { TagsInputWithPaste as Paste } from "compositions/examples/tags-input-with-paste"
export { TagsInputWithSizes as Sizes } from "compositions/examples/tags-input-with-sizes"
export { TagsInputWithStore as Store } from "compositions/examples/tags-input-with-store"
export { TagsInputWithVariants as Variants } from "compositions/examples/tags-input-with-variants"
