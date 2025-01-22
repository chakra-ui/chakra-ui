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
export { MenuWithCheckboxItems as CheckboxItems } from "compositions/examples/menu-with-checkbox-items"
export { MenuWithCommand as Command } from "compositions/examples/menu-with-command"
export { MenuWithContextTrigger as ContextTrigger } from "compositions/examples/menu-with-context-trigger"
export { MenuWithDangerItem as DangerItem } from "compositions/examples/menu-with-danger-item"
export { MenuWithGroup as Group } from "compositions/examples/menu-with-group"
export { MenuWithGroupDynamic as GroupDynamic } from "compositions/examples/menu-with-group-dynamic"
export { MenuWithHideWhenDetached as HideWhenDetached } from "compositions/examples/menu-with-hide-when-detached"
export { MenuWithIconAndCommand as IconAndCommand } from "compositions/examples/menu-with-icon-and-command"
export { MenuWithLinks as Links } from "compositions/examples/menu-with-links"
export { MenuWithMixedLayout as MixedLayout } from "compositions/examples/menu-with-mixed-layout"
export { MenuWithPlacement as Placement } from "compositions/examples/menu-with-placement"
export { MenuWithRadioItems as RadioItems } from "compositions/examples/menu-with-radio-items"
export { MenuWithSubmenu as Submenu } from "compositions/examples/menu-with-submenu"
export { MenuWithSubmenuDynamic as SubmenuDynamic } from "compositions/examples/menu-with-submenu-dynamic"
export { MenuWithinDialog as WithDialog } from "compositions/examples/menu-within-dialog"
