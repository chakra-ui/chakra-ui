import type { Meta } from "@storybook/react"
import { FaBell } from "react-icons/fa"
import { Box, Button, Portal, Tooltip } from "../src"

export default {
  title: "Components / Tooltip",
  decorators: [
    (Story: any) => (
      <Box maxWidth="400px" mx="auto" mt="200px">
        <Story />
      </Box>
    ),
  ],
} satisfies Meta

export const Basic = () => (
  <Tooltip.Root unmountOnExit>
    <Tooltip.Trigger asChild>
      <Button variant="outline" size="sm">
        Hover me
      </Button>
    </Tooltip.Trigger>
    <Portal>
      <Tooltip.Positioner>
        <Tooltip.Content>
          <Tooltip.Arrow>
            <Tooltip.ArrowTip />
          </Tooltip.Arrow>
          This is a chakra tooltip
        </Tooltip.Content>
      </Tooltip.Positioner>
    </Portal>
  </Tooltip.Root>
)

export const WithCustomBg = () => (
  <Tooltip.Root unmountOnExit>
    <Tooltip.Trigger asChild>
      <Button variant="outline" size="sm">
        <FaBell /> 3
      </Button>
    </Tooltip.Trigger>
    <Portal>
      <Tooltip.Positioner>
        <Tooltip.Content css={{ "--tooltip-bg": "tomato" }}>
          <Tooltip.Arrow>
            <Tooltip.ArrowTip />
          </Tooltip.Arrow>
          Notifications
        </Tooltip.Content>
      </Tooltip.Positioner>
    </Portal>
  </Tooltip.Root>
)
