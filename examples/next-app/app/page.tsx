"use client"

import { Link } from "@chakra-ui/next-js"
import { Box, Button, Text } from "@chakra-ui/react"

export default function Page() {
  return (
    <Box textAlign="center" fontSize="xl">
      <Text>Welcome to Chakra UI + Next.js</Text>
      <Link href="#">Go to next</Link>
      <Button>Click me</Button>
    </Box>
  )
}
