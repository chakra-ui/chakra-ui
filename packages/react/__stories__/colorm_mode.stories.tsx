import { Box } from "@chakra-ui/react"
import type { Meta } from "@storybook/react"
import { ColorModeButton, ColorModeProvider } from "compositions/ui/color-mode"

// Import Box for the decorator if it’s used across stories

export default {
  title: "Components/ColorModeButton",
  decorators: [
    (Story) => (
      <ColorModeProvider>
        <Box p="10">
          <Story />
        </Box>
      </ColorModeProvider>
    ),
  ],
} satisfies Meta

export const Basic = () => <ColorModeButton />
