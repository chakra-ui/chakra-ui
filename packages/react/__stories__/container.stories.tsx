import type { Meta } from "@storybook/react"
import { Box } from "../src"

export default {
  title: "Layout / Container",
  decorators: [
    (Story) => (
      <Box p="10">
        <Story />
      </Box>
    ),
  ],
} satisfies Meta

export { ContainerBasic as Basic } from "compositions/examples/container-basic"
export { ContainerWithSizes as Sizes } from "compositions/examples/container-with-sizes"
export { ContainerWithFluid as Fluid } from "compositions/examples/container-with-fluid"
