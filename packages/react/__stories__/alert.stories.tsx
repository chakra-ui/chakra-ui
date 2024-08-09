import { Box } from "../src"

export default {
  title: "Components / Alert",
  decorators: [
    (Story: any) => (
      <Box padding="40px">
        <Story />
      </Box>
    ),
  ],
}

export { AlertBasic as Basic } from "compositions/examples/alert-basic"
export { AlertVariantTable as Variants } from "compositions/examples/alert-variant-table"
export { AlertSizeTable as Sizes } from "compositions/examples/alert-size-table"
export { AlertWithSpinner as WithSpinner } from "compositions/examples/alert-with-spinner"
