import type { Meta } from "@storybook/react"
import { Box } from "../src"

export default {
  title: "Components / Checkbox Card",
  decorators: [
    (Story) => (
      <Box p="10">
        <Story />
      </Box>
    ),
  ],
} satisfies Meta

export { CheckboxCardBasic as Basic } from "compositions/examples/checkbox-card-basic"
export { CheckboxCardDisabled as Disabled } from "compositions/examples/checkbox-card-disabled"
export { CheckboxCardWithStates as States } from "compositions/examples/checkbox-card-with-states"
export { CheckboxCardWithAddon as Addon } from "compositions/examples/checkbox-card-with-addon"
export { CheckboxCardWithIcon as Icon } from "compositions/examples/checkbox-card-with-icon"
export { CheckboxCardVariantTable as Variants } from "compositions/examples/checkbox-card-variant-table"
export { CheckboxCardSizeTable as Sizes } from "compositions/examples/checkbox-card-size-table"
export { CheckboxCardWithGroup as Group } from "compositions/examples/checkbox-card-with-group"
export { CheckboxCardWithoutSnippet as WithoutSnippet } from "compositions/examples/checkbox-card-without-snippet"
