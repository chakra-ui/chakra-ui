import type { Meta } from "@storybook/react"
import { Box } from "../src"

export default {
  title: "Components / Native Select",
  decorators: [
    (Story) => (
      <Box p="10">
        <Story />
      </Box>
    ),
  ],
} satisfies Meta

export { NativeSelectBasic as Basic } from "compositions/examples/native-select-basic"
export { NativeSelectControlled as Controlled } from "compositions/examples/native-select-controlled"
export { NativeSelectWithDisabled as Disabled } from "compositions/examples/native-select-with-disabled"
export { NativeSelectWithHookForm as HookForm } from "compositions/examples/native-select-with-hook-form"
export { NativeSelectWithInvalid as Invalid } from "compositions/examples/native-select-with-invalid"
export { NativeSelectWithInvalidRoot as InvalidRoot } from "compositions/examples/native-select-with-invalid-root"
export { NativeSelectWithSizes as Sizes } from "compositions/examples/native-select-with-sizes"
export { NativeSelectWithVariants as Variants } from "compositions/examples/native-select-with-variants"
