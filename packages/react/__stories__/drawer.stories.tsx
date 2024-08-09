import type { Meta } from "@storybook/react"
import { Box } from "../src"

export default {
  title: "Components / Drawer",
  decorators: [
    (Story) => (
      <Box p="40px">
        <Story />
      </Box>
    ),
  ],
} satisfies Meta

export { DrawerBasic as Basic } from "compositions/examples/drawer-basic"
export { DrawerWithOffset as WithOffset } from "compositions/examples/drawer-with-offset"
export { DrawerWithSizes as Sizes } from "compositions/examples/drawer-with-sizes"
export { DrawerWithPlacement as Placement } from "compositions/examples/drawer-with-placement"
export { DrawerWithInitialFocus as WithInitialFocus } from "compositions/examples/drawer-with-initial-focus"
