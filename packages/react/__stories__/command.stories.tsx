import type { Meta } from "@storybook/react-vite"
import { Toaster } from "compositions/ui/toaster"
import { Box } from "../src"

export default {
  title: "Components / Command",
  decorators: [
    (Story) => (
      <Box p={{ base: "4", md: "10" }}>
        <Story />
        <Toaster />
      </Box>
    ),
  ],
} satisfies Meta

export { CommandBasic as Basic } from "compositions/examples/command-basic"
export { CommandInline as Inline } from "compositions/examples/command-inline"
export { CommandControlledSearch as ControlledSearch } from "compositions/examples/command-controlled-search"
export { CommandWithRootProvider as RootProvider } from "compositions/examples/command-with-root-provider"
export { CommandMultiple as Multiple } from "compositions/examples/command-multiple"
export { CommandWithLinks as Links } from "compositions/examples/command-with-links"
export { CommandWithKeywords as Keywords } from "compositions/examples/command-with-keywords"
export { CommandWithHotkeys as Hotkeys } from "compositions/examples/command-with-hotkeys"
export { CommandWithGroups as Groups } from "compositions/examples/command-with-groups"
export { CommandNested as NestedPages } from "compositions/examples/command-nested"
export { CommandWithAsyncPages as AsyncPages } from "compositions/examples/command-with-async-pages"
export { CommandWithInputPage as InputPage } from "compositions/examples/command-with-input-page"
export { CommandWithAsyncContent as AsyncContent } from "compositions/examples/command-with-async-content"
export { CommandWithLoadMore as LoadMore } from "compositions/examples/command-with-load-more"
export { CommandWithRecentItems as RecentCommands } from "compositions/examples/command-with-recent-items"
export { CommandVirtualized as Virtualized } from "compositions/examples/command-virtualized"
export { CommandWithSizes as Sizes } from "compositions/examples/command-with-sizes"
export { CommandWithEmptyState as EmptyState } from "compositions/examples/command-with-empty-state"
export { CommandWithFooterActions as FooterActions } from "compositions/examples/command-with-footer-actions"
export { CommandWithPrefixSearch as PrefixSearch } from "compositions/examples/command-with-prefix-search"
export { CommandWithTabs as Tabs } from "compositions/examples/command-with-tabs"
