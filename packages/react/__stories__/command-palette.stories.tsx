import type { Meta } from "@storybook/react-vite"
import { Toaster } from "compositions/ui/toaster"
import { Box } from "../src"

export default {
  title: "Components / CommandPalette",
  decorators: [
    (Story) => (
      <Box p="10">
        <Story />
        <Toaster />
      </Box>
    ),
  ],
} satisfies Meta

export { CommandPaletteBasic as Basic } from "compositions/examples/command-palette-basic"
export { CommandPaletteWithSizes as Sizes } from "compositions/examples/command-palette-with-sizes"
export { CommandPaletteWithGroups as Groups } from "compositions/examples/command-palette-with-groups"
export { CommandPaletteWithDescription as Description } from "compositions/examples/command-palette-with-description"
export { CommandPaletteWithAvatar as Avatar } from "compositions/examples/command-palette-with-avatar"
export { CommandPaletteWithDisabledItems as DisabledItems } from "compositions/examples/command-palette-with-disabled-items"
export { CommandPaletteWithHighlight as HighlightMatches } from "compositions/examples/command-palette-with-highlight"
export { CommandPaletteWithRecentItems as RecentItems } from "compositions/examples/command-palette-with-recent-items"
export { CommandPaletteWithEmptyState as EmptyState } from "compositions/examples/command-palette-with-empty-state"
export { CommandPaletteWithStatus as Status } from "compositions/examples/command-palette-with-status"
export { CommandPaletteWithPreview as Preview } from "compositions/examples/command-palette-with-preview"
export { CommandPaletteWithPrefixSearch as PrefixSearch } from "compositions/examples/command-palette-with-prefix-search"
export { CommandPaletteWithTabs as WithTabs } from "compositions/examples/command-palette-with-tabs"
export { CommandPaletteVirtualized as Virtualized } from "compositions/examples/command-palette-virtualized"
export { CommandPaletteWithLinks as Links } from "compositions/examples/command-palette-with-links"
export { CommandPaletteWithFooterActions as FooterActions } from "compositions/examples/command-palette-with-footer-actions"
export { CommandPaletteMultiple as Multiple } from "compositions/examples/command-palette-multiple"
export { CommandPaletteControlled as Controlled } from "compositions/examples/command-palette-controlled"
export { CommandPaletteControlledSearch as ControlledSearch } from "compositions/examples/command-palette-controlled-search"
export { CommandPaletteWithCustomFilter as CustomFilter } from "compositions/examples/command-palette-with-custom-filter"
export { CommandPaletteWithAsyncContent as AsyncContent } from "compositions/examples/command-palette-with-async-content"
export { CommandPaletteNested as Nested } from "compositions/examples/command-palette-nested"
export { CommandPaletteWithinDialog as WithinDialog } from "compositions/examples/command-palette-within-dialog"
export { CommandPaletteWithinDrawer as WithinDrawer } from "compositions/examples/command-palette-within-drawer"
export { CommandPaletteWithinPopover as WithinPopover } from "compositions/examples/command-palette-within-popover"
