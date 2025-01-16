import type { Meta } from "@storybook/react"
import { Box } from "../src"

export default {
  title: "Components / Input",
  decorators: [
    (Story) => (
      <Box p="10">
        <Story />
      </Box>
    ),
  ],
} satisfies Meta

export { InputBasic as Basic } from "compositions/examples/input-basic"
export { InputSizeTable as Sizes } from "compositions/examples/input-size-table"
export { InputVariantTable as Variants } from "compositions/examples/input-variant-table"
export { InputWithAddon as Addon } from "compositions/examples/input-with-addon"
export { InputWithErrorText as ErrorText } from "compositions/examples/input-with-error-text"
export { InputWithField as Field } from "compositions/examples/input-with-field"
export { InputWithFloatingLabel as FloatingLabel } from "compositions/examples/input-with-floating-label"
export { InputWithFocusErrorColor as FocusErrorColor } from "compositions/examples/input-with-focus-error-color"
export { InputWithHelperText as HelperText } from "compositions/examples/input-with-helper-text"
export { InputWithHookForm as HookForm } from "compositions/examples/input-with-hook-form"
export { InputWithLeftAndRightElement as LeftAndRightElement } from "compositions/examples/input-with-left-and-right-element"
export { InputWithLeftElement as LeftElement } from "compositions/examples/input-with-left-element"
export { InputWithMask as Mask } from "compositions/examples/input-with-mask"
