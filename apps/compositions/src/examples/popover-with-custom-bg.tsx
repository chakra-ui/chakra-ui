import { Button, Input, Text } from "@chakra-ui/react"
import {
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverRoot,
  PopoverTitle,
  PopoverTrigger,
} from "compositions/ui/popover"

export const PopoverWithCustomBg = () => {
  return (
    <PopoverRoot>
      <PopoverTrigger asChild>
        <Button size="sm" variant="outline">
          Click me
        </Button>
      </PopoverTrigger>
      <PopoverContent css={{ "--popover-bg": "lightblue" }}>
        <PopoverArrow />
        <PopoverBody>
          <PopoverTitle fontWeight="medium">Naruto Form</PopoverTitle>
          <Text my="4">
            Naruto is a Japanese manga series written and illustrated by Masashi
            Kishimoto.
          </Text>
          <Input bg="bg" placeholder="Your fav. character" size="sm" />
        </PopoverBody>
      </PopoverContent>
    </PopoverRoot>
  )
}
