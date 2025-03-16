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
export { InputWithCardDetails as CardDetails } from "compositions/examples/input-with-card-details"
export { InputWithCardNumber as CardNumber } from "compositions/examples/input-with-card-number"
export { InputWithCharacterCounter as CharacterCounter } from "compositions/examples/input-with-character-counter"
export { InputWithClearButton as ClearButton } from "compositions/examples/input-with-clear-button"
export { InputWithEndAddon as EndAddon } from "compositions/examples/input-with-end-addon"
export { InputWithEndButton as EndButton } from "compositions/examples/input-with-end-button"
export { InputWithEndIcon as EndIcon } from "compositions/examples/input-with-end-icon"
export { InputWithEndText as EndText } from "compositions/examples/input-with-end-text"
export { InputWithErrorText as ErrorText } from "compositions/examples/input-with-error-text"
export { InputWithField as Field } from "compositions/examples/input-with-field"
export { InputWithFloatingLabel as FloatingLabel } from "compositions/examples/input-with-floating-label"
export { InputWithFocusErrorColor as FocusErrorColor } from "compositions/examples/input-with-focus-error-color"
export { InputWithHelperText as HelperText } from "compositions/examples/input-with-helper-text"
export { InputWithHookForm as HookForm } from "compositions/examples/input-with-hook-form"
export { InputWithKbd as Kbd } from "compositions/examples/input-with-kbd"
export { InputWithMask as Mask } from "compositions/examples/input-with-mask"
export { InputWithSelect as Select } from "compositions/examples/input-with-select"
export { InputWithStartAddon as StartAddon } from "compositions/examples/input-with-start-addon"
export { InputWithStartAndEndAddon as StartAndEndAddon } from "compositions/examples/input-with-start-and-end-addon"
export { InputWithStartAndEndText as StartAndEndText } from "compositions/examples/input-with-start-and-end-text"
export { InputWithStartElementEndAddon as StartElementEndAddon } from "compositions/examples/input-with-start-element-end-addon"
export { InputWithStartIcon as StartIcon } from "compositions/examples/input-with-start-icon"
export { InputWithStartText as StartText } from "compositions/examples/input-with-start-text"
