import type { Meta } from "@storybook/react-vite"
import { Box } from "../src"

export default {
  title: "Components / CommandPalette",
  decorators: [
    (Story) => (
      <Box p="10">
        <Story />
      </Box>
    ),
  ],
} satisfies Meta

export { CommandPaletteBasic as Basic } from "compositions/examples/command-palette-basic"
export { CommandPaletteControlled as Controlled } from "compositions/examples/command-palette-controlled"
export { CommandPaletteNested as Nested } from "compositions/examples/command-palette-nested"
export { CommandPaletteWithDescription as Description } from "compositions/examples/command-palette-with-description"
export { CommandPaletteWithDisabledItems as DisabledItems } from "compositions/examples/command-palette-with-disabled-items"
export { CommandPaletteWithFooterActions as FooterActions } from "compositions/examples/command-palette-with-footer-actions"
export { CommandPaletteWithLinks as Links } from "compositions/examples/command-palette-with-links"
export { CommandPaletteControlledSearch as ControlledSearch } from "compositions/examples/command-palette-controlled-search"
export { CommandPaletteMultiple as Multiple } from "compositions/examples/command-palette-multiple"
export { CommandPaletteWithAsyncContent as AsyncContent } from "compositions/examples/command-palette-with-async-content"
export { CommandPaletteWithCustomFilter as CustomFilter } from "compositions/examples/command-palette-with-custom-filter"
export { CommandPaletteWithGroups as Groups } from "compositions/examples/command-palette-with-groups"
export { CommandPaletteWithHighlight as HighlightMatches } from "compositions/examples/command-palette-with-highlight"
export { CommandPaletteWithinDialog as WithinDialog } from "compositions/examples/command-palette-within-dialog"
export { CommandPaletteWithinDrawer as WithinDrawer } from "compositions/examples/command-palette-within-drawer"
export { CommandPaletteWithinPopover as WithinPopover } from "compositions/examples/command-palette-within-popover"
