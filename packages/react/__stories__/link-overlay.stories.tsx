import type { Meta } from "@storybook/react"
import { Box } from "../src"

export default {
  title: "Typography / LinkOverlay",
  decorators: [
    (Story) => (
      <Box p="10">
        <Story />
      </Box>
    ),
  ],
} satisfies Meta

export { LinkOverlayBasic as Basic } from "compositions/examples/link-overlay-basic"
export { LinkOverlayArticle as Article } from "compositions/examples/link-overlay-article"
