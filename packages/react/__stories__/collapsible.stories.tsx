import { Box } from "../src"

export default {
  title: "Components / Collapsible",
  decorators: [
    (Story: any) => (
      <Box padding="40px">
        <Story />
      </Box>
    ),
  ],
}

export { CollapsibleBasic as Basic } from "compositions/examples/collapsible-basic"
export { CollapsibleLazyMounted as LazyMounted } from "compositions/examples/collapsible-lazy-mounted"
