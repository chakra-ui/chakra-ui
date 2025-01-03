import type { Meta } from "@storybook/react"
import { Box } from "../src"

export default {
  title: "Components / Tabs",
  decorators: [
    (Story) => (
      <Box p="10">
        <Story />
      </Box>
    ),
  ],
} satisfies Meta

export { TabsBasic as Basic } from "compositions/examples/tabs-basic"
export { TabsControlled as Controlled } from "compositions/examples/tabs-controlled"
export { TabsLazyMounted as LazyMounted } from "compositions/examples/tabs-lazy-mounted"
export { TabsNested as Nested } from "compositions/examples/tabs-nested"
export { TabsSizeTable as Sizes } from "compositions/examples/tabs-size-table"
export { TabsVariantTable as Variants } from "compositions/examples/tabs-variant-table"
export { TabsWithAnimation as WithAnimation } from "compositions/examples/tabs-with-animation"
export { TabsWithDisabledTab as DisabledTab } from "compositions/examples/tabs-with-disabled-tab"
export { TabsWithDynamicAdd as DynamicAdd } from "compositions/examples/tabs-with-dynamic-add"
export { TabsWithFitted as Fitted } from "compositions/examples/tabs-with-fitted"
export { TabsWithIndicator as Indicator } from "compositions/examples/tabs-with-indicator"
export { TabsWithLinks as LinkTabs } from "compositions/examples/tabs-with-links"
export { TabsWithManualActivation as ManualActivation } from "compositions/examples/tabs-with-manual-activation"
export { TabsWithStore as Store } from "compositions/examples/tabs-with-store"
export { TabsWithVertical as Vertical } from "compositions/examples/tabs-with-vertical"
