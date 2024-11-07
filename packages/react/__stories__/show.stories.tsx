import type { Meta } from "@storybook/react"
import { Box } from "../src"

export default {
  title: "Components / Show",
  decorators: [
    (Story) => (
      <Box p="10">
        <Story />
      </Box>
    ),
  ],
} satisfies Meta

export { ShowBasic as Basic } from "compositions/examples/show-basic"
export { ShowWithFallback as WithFallback } from "compositions/examples/show-with-fallback"
export { ShowWithRenderProp as WithRenderProp } from "compositions/examples/show-with-render-prop"
