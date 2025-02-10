import type { Meta } from "@storybook/react"
import { Box } from "../src"

export default {
  title: "Components / Combobox",
  decorators: [
    (Story) => (
      <Box p="10">
        <Story />
      </Box>
    ),
  ],
} satisfies Meta

export { ComboboxBasic as Basic } from "compositions/examples/combobox-basic"
export { ComboboxMultiDefault as MultiDefault } from "compositions/examples/combobox-multi-default"
export { ComboboxMultiWithReplaceSelectionBehavior as MultiWithReplaceSelectionBehaviors } from "compositions/examples/combobox-multi-with-replace-selection-behavior"
export { ComboboxSelectionBehavior as SelectionBehavior } from "compositions/examples/combobox-selection-behavior"
