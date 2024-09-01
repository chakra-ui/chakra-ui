import type { Meta } from "@storybook/react"
import { Box } from "../src"

export default {
  title: "Components / Checkbox",
  decorators: [
    (Story) => (
      <Box p="10">
        <Story />
      </Box>
    ),
  ],
} satisfies Meta

export { CheckboxBasic as Basic } from "compositions/examples/checkbox-basic"
export { CheckboxControlled as Controlled } from "compositions/examples/checkbox-controlled"
export { CheckboxSizeTable as Sizes } from "compositions/examples/checkbox-size-table"
export { CheckboxVariantTable as Variants } from "compositions/examples/checkbox-variant-table"
export { CheckboxWithColors as WithColors } from "compositions/examples/checkbox-with-colors"
export { CheckboxWithCustomIcon as WithCustomIcon } from "compositions/examples/checkbox-with-custom-icon"
export { CheckboxWithDescription as WithDescription } from "compositions/examples/checkbox-with-description"
export { CheckboxWithForm as WithForm } from "compositions/examples/checkbox-with-form"
export { CheckboxWithGroup as WithGroup } from "compositions/examples/checkbox-with-group"
export { CheckboxWithIndeterminate as WithIndeterminate } from "compositions/examples/checkbox-with-indeterminate"
export { CheckboxWithLink as WithLink } from "compositions/examples/checkbox-with-link"
export { CheckboxWithStates as WithStates } from "compositions/examples/checkbox-with-states"
export { CheckboxWithHookForm as WithHookForm } from "compositions/examples/checkbox-with-hook-form"
