import type { Meta } from "@storybook/react"
import { Box } from "../src"

export default {
  title: "Components / Select",
  decorators: [
    (Story) => (
      <Box p="10">
        <Story />
      </Box>
    ),
  ],
} satisfies Meta

export { SelectAsyncLoading as AsyncLoading } from "compositions/examples/select-async-loading"
export { SelectBasic as Basic } from "compositions/examples/select-basic"
export { SelectControlled as Controlled } from "compositions/examples/select-controlled"
export { SelectInDialog as WithinDialog } from "compositions/examples/select-in-dialog"
export { SelectInPopover as WithinPopover } from "compositions/examples/select-in-popover"
export { SelectWithAvatar as Avatar } from "compositions/examples/select-with-avatar"
export { SelectWithClear as Clear } from "compositions/examples/select-with-clear"
export { SelectWithDisabled as Disabled } from "compositions/examples/select-with-disabled"
export { SelectWithDisabledOption as DisabledOption } from "compositions/examples/select-with-disabled-option"
export { SelectWithHookForm as HookForm } from "compositions/examples/select-with-hook-form"
export { SelectWithInvalid as Invalid } from "compositions/examples/select-with-invalid"
export { SelectWithMultiple as Multiple } from "compositions/examples/select-with-multiple"
export { SelectWithNativeForm as NativeForm } from "compositions/examples/select-with-native-form"
export { SelectWithOptionGroup as OptionGroup } from "compositions/examples/select-with-option-group"
export { SelectWithOverflow as Overflow } from "compositions/examples/select-with-overflow"
export { SelectWithPositioning as Positioning } from "compositions/examples/select-with-positioning"
export { SelectWithSizes as Sizes } from "compositions/examples/select-with-sizes"
export { SelectWithVariants as Variants } from "compositions/examples/select-with-variants"
