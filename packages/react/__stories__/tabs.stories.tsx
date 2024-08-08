import { TabsBasic } from "compositions/examples/tabs-basic"
import { TabsControlled } from "compositions/examples/tabs-controlled"
import { TabsLazyMounted } from "compositions/examples/tabs-lazy-mounted"
import { TabsSizeTable } from "compositions/examples/tabs-size-table"
import { TabsStretched } from "compositions/examples/tabs-stretched"
import { TabsVariantTable } from "compositions/examples/tabs-variant-table"
import { TabsWithDisabledTab } from "compositions/examples/tabs-with-disabled-tab"
import { TabsWithIndicator } from "compositions/examples/tabs-with-indicator"
import { TabsWithLinks } from "compositions/examples/tabs-with-links"
import { TabsWithManualActivation } from "compositions/examples/tabs-with-manual-activation"
import { TabsWithVertical } from "compositions/examples/tabs-with-vertical"
import { Box } from "../src"

export default {
  title: "Components / Tabs",
  decorators: [
    (story: Function) => (
      <Box mx="auto" padding="40px">
        {story()}
      </Box>
    ),
  ],
}

export const Basic = () => {
  return <TabsBasic />
}

export const WithIndicator = () => {
  return <TabsWithIndicator />
}

export const Controlled = () => {
  return <TabsControlled />
}

export const LazyMounted = () => {
  return <TabsLazyMounted />
}

export const Stretched = () => {
  return <TabsStretched />
}

export const DisabledTab = () => {
  return <TabsWithDisabledTab />
}

export const Vertical = () => {
  return <TabsWithVertical />
}

export const LinkTabs = () => {
  return <TabsWithLinks />
}

export const ManualActivation = () => {
  return <TabsWithManualActivation />
}

export const Variants = () => {
  return <TabsVariantTable />
}

export const Sizes = () => {
  return <TabsSizeTable />
}
