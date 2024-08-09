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
export { AlertWithSpinner as WithSpinner } from "compositions/examples/alert-with-spinner"
