import { keyframes } from "@emotion/react"
import type { Meta } from "@storybook/react"
import { useState } from "react"
import { Badge, Box, Button, Center, For, Link, Stack, Text } from "../src"

export default {
  title: "Foundations / Sandbox",
  decorators: [
    (Story) => (
      <Box p="10">
        <Story />
      </Box>
    ),
  ],
} satisfies Meta

const TimeStamp = () => {
  const [data] = useState(() => new Date().toISOString())
  return <Text>{data}</Text>
}

export const ReRenders = () => {
  const [isRed, setIsRed] = useState(false)

  return (
    <Stack gap={5}>
      <Box backgroundColor={isRed ? "red.200" : "blue.200"}>
        <TimeStamp />
      </Box>

      <Box as="mark" color="red.500" bg="bg.error" px="2" py="3">
        Welcome
      </Box>

      <Box asChild bg={isRed ? "red.200" : "blue.200"}>
        <button>
          <TimeStamp />
        </button>
      </Box>

      <Box>
        <Button onClick={() => setIsRed(!isRed)}>Re-Render</Button>
      </Box>
    </Stack>
  )
}

export const ColorPalette = () => {
  return (
    <Stack>
      <For each={["blue", "green", "red"]}>
        {(color) => (
          <Box colorPalette={color}>
            <Box bg="colorPalette.muted" color="colorPalette.fg" p="4">
              Welcome to the{" "}
              <Link variant="underline" href="https://www.google.com">
                jungle <Badge variant="solid"> New</Badge>
              </Link>
              <br />
              <Button>Click me</Button>
            </Box>
          </Box>
        )}
      </For>
    </Stack>
  )
}

export const SelfClosing = () => {
  return (
    <Box rounded="full" overflow="hidden" asChild>
      <img src="https://i.pravatar.cc/150?u=1" alt="placeholder" />
    </Box>
  )
}

export const Layers = () => {
  return <Button bg="red">Click me</Button>
}

export const SortOrder = () => {
  return (
    <Center
      flex={[undefined, undefined, 1, 5]}
      display={["none", "none", "flex"]}
      layerStyle="fill.subtle"
      h="90vh"
      minH="200px"
      position="sticky"
      top="0"
      borderLeft={[undefined, "5px solid red"]}
    >
      <Text>Hello</Text>
    </Center>
  )
}

const opacityKeyframes = keyframes`
  0% { opacity: 0.1; }
  100% { opacity: 1; }
`

export const CustomAnimation = () => {
  return (
    <Box h="400px" w="400px" position="relative">
      <Box
        position="absolute"
        top="0"
        left="0"
        right="0"
        bottom="0"
        backgroundSize="20px 20px"
        backgroundImage="radial-gradient(black 0%, transparent 20%)"
        animation={`4s ease-in-out infinite alternate ${opacityKeyframes}`}
      />
    </Box>
  )
}
