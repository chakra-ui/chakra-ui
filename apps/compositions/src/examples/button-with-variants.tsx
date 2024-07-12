import { Flex } from "@chakra-ui/react"
import { Button } from "compositions/ui/button"

export const ButtonWithSizes = () => {
  return (
    <Flex align="center" wrap="wrap">
      <Button variant="solid">Button</Button>
      <Button variant="subtle">Button</Button>
      <Button variant="outline">Button</Button>
      <Button variant="ghost">Button</Button>
      <Button variant="plain">Button</Button>
    </Flex>
  )
}
