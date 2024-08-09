import { Box } from "../src"

export default {
  title: "Components / Select",
  decorators: [
    (Story: any) => (
      <Box padding="40px">
        <Story />
      </Box>
    ),
  ],
}

export { SelectBasic as Basic } from "compositions/examples/select-basic"
export { SelectControlled as Controlled } from "compositions/examples/select-controlled"
export { SelectInPopover as WithinPopover } from "compositions/examples/select-in-popover"
export { SelectWithAvatar as WithAvatar } from "compositions/examples/select-with-avatar"
export { SelectWithClear as WithClear } from "compositions/examples/select-with-clear"
export { SelectWithDisabled as Disabled } from "compositions/examples/select-with-disabled"
export { SelectWithInvalid as Invalid } from "compositions/examples/select-with-invalid"
export { SelectWithOptionGroup as WithOptionGroup } from "compositions/examples/select-with-option-group"
export { SelectWithOverflow as WithOverflow } from "compositions/examples/select-with-overflow"
export { SelectWithPositioning as Positioning } from "compositions/examples/select-with-positioning"
export { SelectWithSizes as Sizes } from "compositions/examples/select-with-sizes"
export { SelectWithVariants as Variants } from "compositions/examples/select-with-variants"
