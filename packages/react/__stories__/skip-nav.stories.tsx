import type { Meta } from "@storybook/react"
import { Box, SkipNavContent, SkipNavLink } from "../src"

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

export const BasicExample = () => (
  <>
    <SkipNavLink>Skip to Content</SkipNavLink>
    <SkipNavContent />
  </>
)
