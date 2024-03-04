import { MdCheck } from "react-icons/md"
import { Box, IconButton, Link, Popover, Text, chakra } from "../src"

export default {
  title: "Overlay / Popover - Hover",
  decorators: [
    (story: Function) => (
      <chakra.div mx="auto" maxW="400px" mt="200px">
        {story()}
      </chakra.div>
    ),
  ],
}

function Card() {
  return (
    <Box p={5}>
      <Text fontWeight="bold">swyx</Text>
      <Text mt={3}>
        Infinite Builder working on DX @Netlify. Helping people #LearnInPublic
      </Text>
    </Box>
  )
}

export function TwitterEx() {
  return (
    <Popover.Root trigger="hover">
      <Popover.Trigger asChild>
        <Link href="#test" color="blue.500">
          Hover to see @swyx profile
        </Link>
      </Popover.Trigger>
      <Popover.Positioner>
        <Popover.Content
          css={{ bg: "#15202b", color: "white", width: "400px" }}
        >
          <Card />
        </Popover.Content>
      </Popover.Positioner>
    </Popover.Root>
  )
}

export function WithCustomAnimation() {
  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <IconButton aria-label="Check" p={8}>
          <MdCheck />
        </IconButton>
      </Popover.Trigger>
      <Popover.Positioner>
        <Popover.Content
          width="400px"
          variants={{
            enter: {
              y: 0,
              opacity: 1,
              transition: {
                duration: 0.15,
              },
            },
            exit: {
              y: -4,
              opacity: 0,
              transition: {
                duration: 0.1,
              },
            },
          }}
        >
          <Popover.Arrow />
          <Popover.Body>
            Are you sure you want to have that milkshake?
          </Popover.Body>
        </Popover.Content>
      </Popover.Positioner>
    </Popover.Root>
  )
}
