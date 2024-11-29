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
export { CheckboxWithColors as Colors } from "compositions/examples/checkbox-with-colors"
export { CheckboxWithCustomIcon as CustomIcon } from "compositions/examples/checkbox-with-custom-icon"
export { CheckboxWithDescription as Description } from "compositions/examples/checkbox-with-description"
export { CheckboxWithForm as Form } from "compositions/examples/checkbox-with-form"
export { CheckboxWithGroup as Group } from "compositions/examples/checkbox-with-group"
export { CheckboxWithGroupHookForm as GroupHookForm } from "compositions/examples/checkbox-with-group-hook-form"
export { CheckboxWithHookForm as HookForm } from "compositions/examples/checkbox-with-hook-form"
export { CheckboxWithIndeterminate as Indeterminate } from "compositions/examples/checkbox-with-indeterminate"
export { CheckboxWithLink as Link } from "compositions/examples/checkbox-with-link"
export { CheckboxWithStates as States } from "compositions/examples/checkbox-with-states"
export { CheckboxWithStore as Store } from "compositions/examples/checkbox-with-store"
