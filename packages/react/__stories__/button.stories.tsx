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
export { ButtonVariantTable as Variants } from "compositions/examples/button-variant-table"
export { ButtonSizeTable as Sizes } from "compositions/examples/button-size-table"
export { ButtonWithIcons as WithIcon } from "compositions/examples/button-with-icons"
export { ButtonWithLoading as WithLoading } from "compositions/examples/button-with-loading"
export { ButtonWithStyleOverride as WithStyleOverrides } from "compositions/examples/button-with-style-override"
export { ButtonWithGroup as WithGroup } from "compositions/examples/button-with-group"
