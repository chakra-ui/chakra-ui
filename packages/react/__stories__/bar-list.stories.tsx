import { Box } from "../src"

export default {
  title: "Charts / Bar List",
  decorators: [
    (Story: any) => (
      <Box p="10">
        <Story />
      </Box>
    ),
  ],
}

export { BarListAscending as Ascending } from "compositions/examples/charts/bar-list-ascending"
export { BarListBasic as Basic } from "compositions/examples/charts/bar-list-basic"
export { BarListWithFormatter as Formatter } from "compositions/examples/charts/bar-list-with-formatter"
export { BarListWithLabel as Label } from "compositions/examples/charts/bar-list-with-label"
export { BarListWithLink as Link } from "compositions/examples/charts/bar-list-with-link"
export { BarListWithMultiValue as MultiValue } from "compositions/examples/charts/bar-list-with-multi-value"
export { BarListWithTooltip as Tooltip } from "compositions/examples/charts/bar-list-with-tooltip"
