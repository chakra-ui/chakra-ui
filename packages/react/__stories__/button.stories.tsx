import type { Meta } from "@storybook/react"
import { Box } from "../src"

export default {
  title: "Components / Button",
  decorators: [
    (Story) => (
      <Box p="10">
        <Story />
      </Box>
    ),
  ],
} satisfies Meta

export { ButtonBasic as Basic } from "compositions/examples/button-basic"
export { ButtonSizeTable as Sizes } from "compositions/examples/button-size-table"
export { ButtonVariantTable as Variants } from "compositions/examples/button-variant-table"
export { ButtonWithGroup as Group } from "compositions/examples/button-with-group"
export { ButtonWithIcons as Icon } from "compositions/examples/button-with-icons"
export { ButtonWithLoading as Loading } from "compositions/examples/button-with-loading"
export { ButtonWithMenu as Menu } from "compositions/examples/button-with-menu"
export { ButtonWithResponsiveSize as ResponsiveSize } from "compositions/examples/button-with-responsive-size"
export { ButtonWithStyleOverride as StyleOverrides } from "compositions/examples/button-with-style-override"
