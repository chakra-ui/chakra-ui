import type { Meta } from "@storybook/react"
import { Box } from "../src"

export default {
  title: "Components / Loader",
  decorators: [
    (Story) => (
      <Box p="10">
        <Story />
      </Box>
    ),
  ],
} satisfies Meta

export { LoaderBasic as Basic } from "compositions/examples/loader-basic"
export { LoaderWithBadge as WithBadge } from "compositions/examples/loader-with-badge"
export { LoaderWithOverlay as WithOverlay } from "compositions/examples/loader-with-overlay"
