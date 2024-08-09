import { Box } from "../src"

export default {
  title: "Components / Portal",
  decorators: [
    (Story: any) => (
      <Box padding="40px">
        <Story />
      </Box>
    ),
  ],
}

export { PortalBasic as Basic } from "compositions/examples/portal-basic"
export { PortalWithIframe as WithIframe } from "compositions/examples/portal-with-iframe"
export { PortalWithContainer as WithContainer } from "compositions/examples/portal-with-container"
