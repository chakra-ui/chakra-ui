import type { Meta } from "@storybook/react"
import { Box } from "../src"

export default {
  title: "Components / Password Input",
  decorators: [
    (Story) => (
      <Box p="10">
        <Story />
      </Box>
    ),
  ],
} satisfies Meta

export { PasswordInputBasic as Basic } from "compositions/examples/password-input-basic"
export { PasswordInputControlled as Controlled } from "compositions/examples/password-input-controlled"
export { PasswordInputControlledVisibility as ControlledVisibility } from "compositions/examples/password-input-controlled-visibility"
export { PasswordInputWithSizes as Sizes } from "compositions/examples/password-input-with-sizes"
export { PasswordInputWithStrengthIndicator as StrengthIndicator } from "compositions/examples/password-input-with-strength-indicator"
