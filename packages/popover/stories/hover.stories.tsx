import { IconButton } from "@chakra-ui/button"
import { Box, Link, Text } from "@chakra-ui/layout"
import * as React from "react"
import { MdCheck } from "react-icons/md"
import {
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
} from "../src"

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
    <Popover trigger="hover">
      <PopoverTrigger>
        <Link href="#test" color="blue.500">
          Hover to see @swyx profile
        </Link>
      </PopoverTrigger>

      <PopoverContent
        sx={{
          bg: "#15202b",
          color: "white",
          width: "400px",
        }}
      >
        <Card />
      </PopoverContent>
    </Popover>
  )
}

export function WithCustomAnimation() {
  return (
    <Popover>
      <PopoverTrigger>
        <IconButton aria-label="Check" p={8}>
          <MdCheck />
        </IconButton>
      </PopoverTrigger>
      <PopoverContent
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
        <PopoverArrow />
        <PopoverBody>Are you sure you want to have that milkshake?</PopoverBody>
      </PopoverContent>
    </Popover>
  )
}
