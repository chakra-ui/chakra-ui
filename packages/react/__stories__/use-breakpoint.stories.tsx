import type { Meta } from "@storybook/react"
import { Box, Flex, useBreakpointValue } from "../src"

export default {
  title: "Hooks / useBreakpointValue",
  decorators: [
    (Story) => (
      <Box p="10">
        <Story />
      </Box>
    ),
  ],
} satisfies Meta

export const Basic = () => {
  const value = useBreakpointValue({ base: false, lg: true }, { ssr: false })
  return <Flex>{value ? "true" : "false"}</Flex>
}
