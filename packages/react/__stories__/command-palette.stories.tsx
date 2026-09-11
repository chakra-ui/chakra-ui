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
export { CommandPaletteWithLinks as Links } from "compositions/examples/command-palette-with-links"
export { CommandPaletteWithCustomFilter as AliasesAndGroups } from "compositions/examples/command-palette-with-custom-filter"
export { CommandPaletteNested as NestedPages } from "compositions/examples/command-palette-nested"
export { CommandPaletteWithAsyncContent as AsyncContent } from "compositions/examples/command-palette-with-async-content"
export { CommandPaletteWithDisabledItems as ContextualCommands } from "compositions/examples/command-palette-with-disabled-items"
export { CommandPaletteWithRecentItems as RecentCommands } from "compositions/examples/command-palette-with-recent-items"
export { CommandPaletteWithPreview as Preview } from "compositions/examples/command-palette-with-preview"
export { CommandPaletteVirtualized as Virtualized } from "compositions/examples/command-palette-virtualized"
export { CommandPaletteWithSizes as Sizes } from "compositions/examples/command-palette-with-sizes"
