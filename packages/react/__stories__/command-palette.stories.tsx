import type { Meta } from "@storybook/react-vite"
import { Toaster } from "compositions/ui/toaster"
import { Box } from "../src"

export default {
  title: "Components / CommandPalette",
  decorators: [
    (Story) => (
      <Box p={{ base: "4", md: "10" }}>
        <Story />
        <Toaster />
      </Box>
    ),
  ],
} satisfies Meta

export { CommandPaletteBasic as Basic } from "compositions/examples/command-palette-basic"
export { CommandPaletteControlled as Controlled } from "compositions/examples/command-palette-controlled"
export { CommandPaletteControlledSearch as ControlledSearch } from "compositions/examples/command-palette-controlled-search"
export { CommandPaletteMultiple as Multiple } from "compositions/examples/command-palette-multiple"
export { CommandPaletteWithLinks as Links } from "compositions/examples/command-palette-with-links"
export { CommandPaletteWithCustomFilter as AliasesAndGroups } from "compositions/examples/command-palette-with-custom-filter"
export { CommandPaletteWithGroups as Groups } from "compositions/examples/command-palette-with-groups"
export { CommandPaletteNested as NestedPages } from "compositions/examples/command-palette-nested"
export { CommandPaletteWithAsyncContent as AsyncContent } from "compositions/examples/command-palette-with-async-content"
export { CommandPaletteWithDisabledItems as ContextualCommands } from "compositions/examples/command-palette-with-disabled-items"
export { CommandPaletteWithRecentItems as RecentCommands } from "compositions/examples/command-palette-with-recent-items"
export { CommandPaletteVirtualized as Virtualized } from "compositions/examples/command-palette-virtualized"
export { CommandPaletteWithSizes as Sizes } from "compositions/examples/command-palette-with-sizes"
export { CommandPaletteWithAvatar as Avatar } from "compositions/examples/command-palette-with-avatar"
export { CommandPaletteWithDescription as Description } from "compositions/examples/command-palette-with-description"
export { CommandPaletteWithEmptyState as EmptyState } from "compositions/examples/command-palette-with-empty-state"
export { CommandPaletteWithFooterActions as FooterActions } from "compositions/examples/command-palette-with-footer-actions"
export { CommandPaletteWithHighlight as Highlight } from "compositions/examples/command-palette-with-highlight"
export { CommandPaletteWithPrefixSearch as PrefixSearch } from "compositions/examples/command-palette-with-prefix-search"
export { CommandPaletteWithStatus as Status } from "compositions/examples/command-palette-with-status"
export { CommandPaletteWithTabs as Tabs } from "compositions/examples/command-palette-with-tabs"
export { CommandPaletteComposition as Composition } from "compositions/examples/command-palette-composition"
