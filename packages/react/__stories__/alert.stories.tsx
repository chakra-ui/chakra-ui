import type { Meta } from "@storybook/react"
import { Box } from "../src"

export default {
  title: "Components / Alert",
  decorators: [
    (Story) => (
      <Box p="10">
        <Story />
      </Box>
    ),
  ],
} satisfies Meta

export { AlertBasic as Basic } from "compositions/examples/alert-basic"
export { AlertSizeTable as Sizes } from "compositions/examples/alert-size-table"
export { AlertVariantTable as Variants } from "compositions/examples/alert-variant-table"
export { AlertWithButtons as WithButtons } from "compositions/examples/alert-with-buttons"
export { AlertWithCustomIcon as WithCustomIcon } from "compositions/examples/alert-with-custom-icon"
export { AlertWithDescription as WithDescription } from "compositions/examples/alert-with-description"
export { AlertWithSpinner as WithSpinner } from "compositions/examples/alert-with-spinner"
export { AlertWithStatus as WithStatus } from "compositions/examples/alert-with-status"
