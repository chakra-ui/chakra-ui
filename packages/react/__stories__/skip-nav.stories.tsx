import type { Meta } from "@storybook/react-vite"
import { Box } from "../src"

export default {
  title: "Components / Skip Nav",
  decorators: [
    (Story) => (
      <Box p="10">
        <Story />
      </Box>
    ),
  ],
} satisfies Meta

export { SkipNavBasic as Basic } from "compositions/examples/skip-nav-basic"
export { SkipNavWithContent as WithContent } from "compositions/examples/skip-nav-with-content"
export { SkipNavCustomId as CustomId } from "compositions/examples/skip-nav-custom-id"
