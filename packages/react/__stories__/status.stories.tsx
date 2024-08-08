import { StatusBasic } from "compositions/examples/status-basic"
import { StatusSizeTable } from "compositions/examples/status-size-table"
import { StatusWithLabel } from "compositions/examples/status-with-label"
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

export const Basic = () => {
  return <StatusBasic />
}

export const WithLabel = () => {
  return <StatusWithLabel />
}

export const Sizes = () => {
  return <StatusSizeTable />
}
