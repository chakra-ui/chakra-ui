import type { Meta } from "@storybook/react-vite"
import { Box } from "../src"

export default {
  title: "Components / Splitter",
  decorators: [
    (Story) => (
      <Box p="10">
        <Story />
      </Box>
    ),
  ],
} satisfies Meta

export { SplitterBasic as Basic } from "compositions/examples/splitter-basic"
export { SplitterVertical as Vertical } from "compositions/examples/splitter-vertical"
export { SplitterThreePanels as ThreePanels } from "compositions/examples/splitter-three-panels"
