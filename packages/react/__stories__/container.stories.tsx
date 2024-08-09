import { Box } from "../src"

export default {
  title: "Layout / Container",
  decorators: [
    (Story: any) => (
      <Box padding="40px">
        <Story />
      </Box>
    ),
  ],
}

export { ContainerBasic as Basic } from "compositions/examples/container-basic"
export { ContainerWithSizes as Sizes } from "compositions/examples/container-with-sizes"
export { ContainerWithFluid as Fluid } from "compositions/examples/container-with-fluid"
