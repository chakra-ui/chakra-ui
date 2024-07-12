import { Flex } from "@chakra-ui/react"
import { Button } from "compositions/ui/button"

export const ButtonWithSizes = () => {
  return (
    <Flex wrap="wrap">
      <Button size="xs">Button</Button>
      <Button size="sm">Button</Button>
      <Button size="md">Button</Button>
      <Button size="lg">Button</Button>
    </Flex>
  )
}
