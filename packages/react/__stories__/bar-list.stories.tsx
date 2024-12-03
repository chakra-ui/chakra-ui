import { Box } from "../src"

export default {
  title: "WIP / Bar List",
  decorators: [
    (Story: any) => (
      <Box p="10">
        <Story />
      </Box>
    ),
  ],
}

export { BarListAscending as Ascending } from "compositions/chart/examples/bar-list-ascending"
export { BarListBasic as Basic } from "compositions/chart/examples/bar-list-basic"
export { BarListWithFormatter as Formatter } from "compositions/chart/examples/bar-list-with-formatter"
export { BarListWithLabel as Label } from "compositions/chart/examples/bar-list-with-label"
export { BarListWithLink as Link } from "compositions/chart/examples/bar-list-with-link"
export { BarListWithMultiValue as MultiValue } from "compositions/chart/examples/bar-list-with-multi-value"
export { BarListWithTooltip as Tooltip } from "compositions/chart/examples/bar-list-with-tooltip"
