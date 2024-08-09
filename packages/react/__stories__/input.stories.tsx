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
export { InputWithErrorText as WithErrorText } from "compositions/examples/input-with-error-text"
export { InputWithField as WithField } from "compositions/examples/input-with-field"
export { InputWithHelperText as WithHelperText } from "compositions/examples/input-with-helper-text"
export { InputWithLeftAndRightElement as WithLeftAndRightElement } from "compositions/examples/input-with-left-and-right-element"
export { InputWithLeftElement as WithLeftElement } from "compositions/examples/input-with-left-element"
