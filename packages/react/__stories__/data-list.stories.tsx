import type { Meta } from "@storybook/react"
import { Box } from "../src"

export default {
  title: "Components / Data List",
  decorators: [
    (Story) => (
      <Box padding="40px">
        <Story />
      </Box>
    ),
  ],
} satisfies Meta

export { DataListBasic as Basic } from "compositions/examples/data-list-basic"
export { DataListSizeTable as Sizes } from "compositions/examples/data-list-size-table"
export { DataListVertical as Vertical } from "compositions/examples/data-list-vertical"
export { DataListWithInfo as WithInfo } from "compositions/examples/data-list-with-info"
