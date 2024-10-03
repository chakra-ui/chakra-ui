import type { Meta } from "@storybook/react"
import {
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverRoot,
  PopoverTitle,
  PopoverTrigger,
} from "compositions/ui/popover"
import { Box, Button, Input, Stack, Text } from "../src"
import { Theme } from "../src/components/theme"

export default {
  title: "Foundations / Theme",
  decorators: [
    (Story) => (
      <Box p="10">
        <Story />
      </Box>
    ),
  ],
} satisfies Meta

export const Basic = () => {
  return (
    <Stack align="flex-start">
      <Button variant="surface" colorPalette="teal">
        Auto Button
      </Button>
      <Theme p="4" appearance="dark" colorPalette="teal">
        <Button variant="surface">Dark Button</Button>
      </Theme>
      <Theme p="4" appearance="light" colorPalette="teal">
        <Button variant="surface">Light Button</Button>
      </Theme>
    </Stack>
  )
}

export const Nested = () => {
  return (
    <Box>
      <Box p="8" borderWidth="1px">
        Hello Normal <Button>Click me</Button>
        <Theme appearance="dark" colorPalette="red">
          <Box p="8" borderWidth="1px">
            Hello Dark <Button>Click me</Button>
            <Theme appearance="light" colorPalette="pink">
              <Box p="8" borderWidth="1px">
                Hello Light <Button>Click me</Button>
              </Box>
            </Theme>
          </Box>
        </Theme>
      </Box>
    </Box>
  )
}

export const Portalled = () => {
  return (
    <PopoverRoot>
      <PopoverTrigger asChild>
        <Button size="sm" variant="outline">
          Click me
        </Button>
      </PopoverTrigger>
      <Theme asChild appearance="dark" colorPalette="teal">
        <PopoverContent>
          <PopoverArrow />
          <PopoverBody>
            <PopoverTitle fontWeight="medium">Naruto Form</PopoverTitle>
            <Text my="4">
              Naruto is a Japanese manga series written and illustrated by
              Masashi Kishimoto.
            </Text>
            <Input placeholder="Search" />
            <Button>Click me</Button>
          </PopoverBody>
        </PopoverContent>
      </Theme>
    </PopoverRoot>
  )
}
