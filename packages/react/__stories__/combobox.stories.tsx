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
export { ComboboxAutoHighlight as AutoHighlight } from "compositions/examples/combobox-autohighlight"
export { ComboboxControlled as Controlled } from "compositions/examples/combobox-controlled"
export { ComboboxWithMultiple as Multiple } from "compositions/examples/combobox-with-multiple"
export { ComboboxWithOptionGroup as OptionGroup } from "compositions/examples/combobox-with-option-group"
export { ComboboxMinCharacter as MinCharacter } from "compositions/examples/combobox-min-character"
export { ComboboxWithDisabled as Disabled } from "compositions/examples/combobox-with-disabled"
export { ComboboxWithDisabledItem as DisabledItem } from "compositions/examples/combobox-with-disabled-item"
export { ComboboxWithAsyncContent as Async } from "compositions/examples/combobox-with-async-content"
export { ComboboxInPopover as WithinPopover } from "compositions/examples/combobox-in-popover"
export { ComboboxRehydrateValue as RehydrateValue } from "compositions/examples/combobox-rehydrate-value"
export { ComboboxWithCustomItem as CustomItem } from "compositions/examples/combobox-with-custom-item"
export { ComboboxOpenControlled as OpenControlled } from "compositions/examples/combobox-open-controlled"
export { ComboboxWithHighlight as Highlight } from "compositions/examples/combobox-with-highlight"
export { ComboboxWithSizes as Sizes } from "compositions/examples/combobox-with-sizes"
export { ComboboxWithVariants as Variants } from "compositions/examples/combobox-with-variants"
export { ComboboxWithLinks as Links } from "compositions/examples/combobox-with-links"
export { ComboboxOpenOnClick as OpenOnClick } from "compositions/examples/combobox-open-on-click"
export { ComboboxWithStore as Store } from "compositions/examples/combobox-with-store"
export { ComboboxVirtualized as Virtualized } from "compositions/examples/combobox-virtualized"
export { ComboboxWithLimit as Limit } from "compositions/examples/combobox-with-limit"
export { ComboboxWithPositioning as Positioning } from "compositions/examples/combobox-with-positioning"
export { ComboboxWithCustomAnimation as CustomAnimation } from "compositions/examples/combobox-with-custom-animation"
export { ComboboxWithInvalid as Invalid } from "compositions/examples/combobox-with-invalid"
export { ComboboxWithInputGroup as InputGroup } from "compositions/examples/combobox-with-input-group"
export { ComboboxWithField as Field } from "compositions/examples/combobox-with-field"
export { ComboboxWithCustomFilter as CustomFilter } from "compositions/examples/combobox-with-custom-filter"
export { ComboboxWithInputInContent as InputInContent } from "compositions/examples/combobox-with-input-in-content"

export { ComboboxWithSelectionBehavior as SelectionBehavior } from "compositions/examples/combobox-with-selection-behavior"
export { ComboboxWithCreateableOptions as CreateableOptions } from "compositions/examples/combobox-with-createable-options"
export { ComboboxColorPicker as ColorPicker } from "compositions/examples/combobox-color-picker"
