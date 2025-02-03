import type { Meta } from "@storybook/react"
import { Box } from "../src"

export default {
  title: "Components / PinInput",
  decorators: [
    (Story) => (
      <Box p="10">
        <Story />
      </Box>
    ),
  ],
} satisfies Meta

export { PinInputAlphanumeric as Alphanumeric } from "compositions/examples/pin-input-alphanumeric"
export { PinInputAttached as Attached } from "compositions/examples/pin-input-attached"
export { PinInputBasic as Basic } from "compositions/examples/pin-input-basic"
export { PinInputControlled as Controlled } from "compositions/examples/pin-input-controlled"
export { PinInputWithField as WithField } from "compositions/examples/pin-input-with-field"
export { PinInputWithHookForm as WithHookForm } from "compositions/examples/pin-input-with-hook-form"
export { PinInputWithMask as WithMask } from "compositions/examples/pin-input-with-mask"
export { PinInputWithOtp as WithOtp } from "compositions/examples/pin-input-with-otp"
export { PinInputWithPlaceholder as WithPlaceholder } from "compositions/examples/pin-input-with-placeholder"
export { PinInputWithSizes as Sizes } from "compositions/examples/pin-input-with-sizes"
export { PinInputWithStore as WithStore } from "compositions/examples/pin-input-with-store"
export { PinInputWithoutSnippet as WithoutSnippet } from "compositions/examples/pin-input-without-snippet"
