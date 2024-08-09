import { Box } from "../src"

export default {
  title: "Components / Status",
  decorators: [
    (Story: any) => (
      <Box padding="40px">
        <Story />
      </Box>
    ),
  ],
}

export { StatusBasic as Basic } from "compositions/examples/status-basic"
export { StatusWithLabel as WithLabel } from "compositions/examples/status-with-label"
export { StatusSizeTable as Sizes } from "compositions/examples/status-size-table"
