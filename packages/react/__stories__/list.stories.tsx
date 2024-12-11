import type { Meta } from "@storybook/react"
import { Box } from "../src"

export default {
  title: "Components / List",
  decorators: [
    (Story) => (
      <Box p="10">
        <Story />
      </Box>
    ),
  ],
} satisfies Meta

export { ListBasic as Basic } from "compositions/examples/list-basic"
export { ListNested as Nested } from "compositions/examples/list-nested"
export { ListOrdered as Ordered } from "compositions/examples/list-ordered"
export { ListWithIcon as Icon } from "compositions/examples/list-with-icon"
export { ListWithMarkerStyle as MarkerStyle } from "compositions/examples/list-with-marker-style"
