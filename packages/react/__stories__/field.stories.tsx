import type { Meta } from "@storybook/react"
import { Box } from "../src"

export default {
  title: "Components / Field",
  decorators: [
    (Story) => (
      <Box p="10">
        <Story />
      </Box>
    ),
  ],
} satisfies Meta

export { FieldBasic as Basic } from "compositions/examples/field-basic"
export { FieldHorizontal as Horizontal } from "compositions/examples/field-horizontal"
export { FieldWithDisabled as Disabled } from "compositions/examples/field-with-disabled"
export { FieldWithErrorText as ErrorText } from "compositions/examples/field-with-error-text"
export { FieldWithHelperText as HelperText } from "compositions/examples/field-with-helper-text"
export { FieldWithNativeSelect as NativeSelect } from "compositions/examples/field-with-native-select"
export { FieldWithOptional as Optional } from "compositions/examples/field-with-optional"
export { FieldWithRequired as Required } from "compositions/examples/field-with-required"
