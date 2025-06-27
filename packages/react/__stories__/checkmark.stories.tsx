import type { Meta } from "@storybook/react-vite"
import { Box } from "../src"

export default {
  title: "Components / Checkmark",
  decorators: [
    (Story) => (
      <Box p="10">
        <Story />
      </Box>
    ),
  ],
} satisfies Meta

export { CheckmarkBasic as Basic } from "compositions/examples/checkmark-basic"
