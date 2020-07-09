import * as React from "react"
import { Popover, PopoverTrigger, PopoverContent } from "../src"
import { Box, Text, Link } from "@chakra-ui/layout"

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
}
