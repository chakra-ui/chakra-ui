import { Box } from "../src"

export default {
  title: "Components / HoverCard",
  decorators: [
    (Story: any) => (
      <Box padding="40px">
        <Story />
      </Box>
    ),
  ],
}

export { HoverCardBasic as Basic } from "compositions/examples/hover-card-basic"
export { HoverCardControlled as Controlled } from "compositions/examples/hover-card-controlled"
export { HoverCardWithDelay as WithDelay } from "compositions/examples/hover-card-with-delay"
export { HoverCardWithPlacement as WithPlacement } from "compositions/examples/hover-card-with-placement"
