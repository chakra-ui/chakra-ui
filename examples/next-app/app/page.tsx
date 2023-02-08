"use client"

import { Link } from "@chakra-ui/next-js"
import { Box, Button, Text, useColorMode } from "@chakra-ui/react"

export default function Page() {
  const { toggleColorMode } = useColorMode()
  return (
    <Box textAlign="center" fontSize="xl">
      <Text>Welcome to Chakra UI + Next.js</Text>
      <Link href="#">Go to next</Link>
      <Button onClick={toggleColorMode}>Click me</Button>
    </Box>
  )
}
