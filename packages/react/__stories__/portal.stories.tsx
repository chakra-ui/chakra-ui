import type { Meta } from "@storybook/react"
import { Box } from "../src"

export default {
  title: "Components / Portal",
  decorators: [
    (Story) => (
      <Box p="10">
        <Story />
      </Box>
    ),
  ],
} satisfies Meta

export { PortalBasic as Basic } from "compositions/examples/portal-basic"
export { PortalWithIframe as Iframe } from "compositions/examples/portal-with-iframe"
export { PortalWithContainer as Container } from "compositions/examples/portal-with-container"
