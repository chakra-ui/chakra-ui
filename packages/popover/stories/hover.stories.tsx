import * as React from "react"
import { Box, Text, Link } from "@chakra-ui/layout"
import { IconButton } from "@chakra-ui/button"
import { MdCheck } from "react-icons/md"
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverBody,
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

export default {
  title: "Popover / Hover",
}

export const TwitterEx = () => (
  <Popover trigger="hover">
    <PopoverTrigger>
      <Link href="#" color="blue.500">
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

export const Bug = () => (
  <Popover>
    <PopoverTrigger>
      <IconButton aria-label="Check" p={8}>
        <MdCheck />
      </IconButton>
    </PopoverTrigger>
    <PopoverContent>
      <PopoverArrow />
      <PopoverBody>Are you sure you want to have that milkshake?</PopoverBody>
    </PopoverContent>
  </Popover>
)
