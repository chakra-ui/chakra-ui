import type { Meta } from "@storybook/react"
import { Box } from "../src"

export default {
  title: "Components / Fieldset",
  decorators: [
    (Story) => (
      <Box p="10">
        <Story />
      </Box>
    ),
  ],
} satisfies Meta

export { FieldsetBasic as Basic } from "compositions/examples/fieldset-basic"
export { FieldsetWithDisabled as Disabled } from "compositions/examples/fieldset-with-disabled"
export { FieldsetWithInvalid as Invalid } from "compositions/examples/fieldset-with-invalid"
