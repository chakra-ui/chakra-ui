import type { Meta } from "@storybook/react-vite"
import { Box } from "../src"

export default {
  title: "Components / Listbox",
  decorators: [
    (Story) => (
      <Box p="10">
        <Story />
      </Box>
    ),
  ],
} satisfies Meta

export { ListboxBasic as Basic } from "compositions/examples/listbox-basic"
export { ListboxControlled as Controlled } from "compositions/examples/listbox-controlled"
export { ListboxDisabledItem as DisabledItem } from "compositions/examples/listbox-disabled-item"
export { ListboxExtendedSelect as ExtendedSelect } from "compositions/examples/listbox-extended-select"
export { ListboxGrouped as Grouped } from "compositions/examples/listbox-grouped"
export { ListboxHorizontal as Horizontal } from "compositions/examples/listbox-horizontal"
export { ListboxImageExplorer as ImageExplorer } from "compositions/examples/listbox-image-explorer"
export { ListboxMultiselect as Multiselect } from "compositions/examples/listbox-multiselect"
export { ListboxSelectAll as SelectAll } from "compositions/examples/listbox-select-all"
export { ListboxTransferList as TransferList } from "compositions/examples/listbox-transfer-list"
export { ListboxVirtualized as Virtualized } from "compositions/examples/listbox-virtualized"
export { ListboxWithCheckmark as Checkmark } from "compositions/examples/listbox-with-checkmark"
export { ListboxWithDescription as Description } from "compositions/examples/listbox-with-description"
export { ListboxWithDialog as Dialog } from "compositions/examples/listbox-with-dialog"
export { ListboxWithEmojiGrid as EmojiGrid } from "compositions/examples/listbox-with-grid"
export { ListboxWithIcon as Icon } from "compositions/examples/listbox-with-icon"
export { ListboxWithInput as Input } from "compositions/examples/listbox-with-input"
export { ListboxWithPopover as Popover } from "compositions/examples/listbox-with-popover"
export { ListboxWithStore as Store } from "compositions/examples/listbox-with-store"
