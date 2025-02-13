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
export { ComboboxCustomFilter as CustomFilter } from "compositions/examples/combobox-with-custom-filter"
export { ComboboxWithAsyncContent as AsyncCombobox } from "compositions/examples/combobox-with-async-content"
export { ComboboxWithCustomOptions as CustomOptions } from "compositions/examples/combobox-with-custom-options"
export { ComboboxWithDisabledOptions as DisableOptions } from "compositions/examples/combobox-with-disabled-options"
export { ComboboxSelectionBehavior as SelectionBehavior } from "compositions/examples/combobox-with-selection-behavior"
export { ComboboxWithCreateableOptions as CreateableOptions } from "compositions/examples/combobox-with-createable-options"
