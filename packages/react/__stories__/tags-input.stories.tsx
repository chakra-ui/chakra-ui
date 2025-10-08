import type { Meta } from "@storybook/react-vite"
import { Box } from "../src"

export default {
  title: "Components / Tags Input",
  decorators: [
    (Story) => (
      <Box p="10">
        <Story />
      </Box>
    ),
  ],
} satisfies Meta

export { TagsInputBasic as Basic } from "compositions/examples/tags-input-basic"
