import type { Meta } from "@storybook/react"
import { Box } from "../src"

export default {
  title: "Components / Menu",
  decorators: [
    (Story) => (
      <Box p="10">
        <Story />
      </Box>
    ),
  ],
} satisfies Meta

export { MenuBasic as Basic } from "compositions/examples/menu-basic"
export { MenuWithCommand as WithCommand } from "compositions/examples/menu-with-command"
export { MenuWithContextTrigger as WithContextTrigger } from "compositions/examples/menu-with-context-trigger"
export { MenuWithDangerItem as WithDangerItem } from "compositions/examples/menu-with-danger-item"
export { MenuWithGroup as WithGroup } from "compositions/examples/menu-with-group"
export { MenuWithGroupDynamic as WithGroupDynamic } from "compositions/examples/menu-with-group-dynamic"
export { MenuWithIconAndCommand as WithIconAndCommand } from "compositions/examples/menu-with-icon-and-command"
export { MenuWithLinks as WithLinks } from "compositions/examples/menu-with-links"
export { MenuWithMixedLayout as WithMixedLayout } from "compositions/examples/menu-with-mixed-layout"
export { MenuWithPlacement as WithPlacement } from "compositions/examples/menu-with-placement"
export { MenuWithRadioItems as WithRadioItems } from "compositions/examples/menu-with-radio-items"
export { MenuWithSubmenu as WithSubmenu } from "compositions/examples/menu-with-submenu"
export { MenuWithSubmenuDynamic as WithSubmenuDynamic } from "compositions/examples/menu-with-submenu-dynamic"
