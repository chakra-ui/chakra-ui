import type { Meta } from "@storybook/react-vite"
import { Box } from "../src"

export default {
  title: "Components / Drawer",
  decorators: [
    (Story) => (
      <Box p="10">
        <Story />
      </Box>
    ),
  ],
} satisfies Meta

export { DrawerBasic as Basic } from "compositions/examples/drawer-basic"
export { DrawerWithContext as Context } from "compositions/examples/drawer-with-context"
export { DrawerWithCustomContainer as CustomContainer } from "compositions/examples/drawer-with-custom-container"
export { DrawerWithHeaderActions as HeaderActions } from "compositions/examples/drawer-with-header-actions"
export { DrawerWithInitialFocus as InitialFocus } from "compositions/examples/drawer-with-initial-focus"
export { DrawerWithOffset as Offset } from "compositions/examples/drawer-with-offset"
export { DrawerWithPlacement as Placement } from "compositions/examples/drawer-with-placement"
export { DrawerWithConditionalVariants as ConditionalVariants } from "compositions/examples/drawer-with-conditional-variants"
export { DrawerWithSizes as Sizes } from "compositions/examples/drawer-with-sizes"
