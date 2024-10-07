import { Button, Input, Text, Theme } from "@chakra-ui/react"
import {
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverRoot,
  PopoverTitle,
  PopoverTrigger,
} from "compositions/ui/popover"

export const ThemeWithPortalled = () => {
  return (
    <PopoverRoot>
      <PopoverTrigger asChild>
        <Button size="sm" variant="outline">
          Click me
        </Button>
      </PopoverTrigger>
      <Theme asChild appearance="dark" colorPalette="teal">
        <PopoverContent>
          <PopoverArrow />
          <PopoverBody>
            <PopoverTitle fontWeight="medium">Naruto Form</PopoverTitle>
            <Text my="4">
              Naruto is a Japanese manga series written and illustrated by
              Masashi Kishimoto.
            </Text>
            <Input placeholder="Search" />
            <Button>Click me</Button>
          </PopoverBody>
        </PopoverContent>
      </Theme>
    </PopoverRoot>
  )
}
