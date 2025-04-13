import { Box, Button, Heading } from "@chakra-ui/react"
import type { Route } from "./+types/home"

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ]
}

export default function Home() {
  return (
    <Box p="10" spaceY="4">
      <Heading fontWeight="light">Hello World</Heading>
      <Button>Click me</Button>
    </Box>
  )
}
