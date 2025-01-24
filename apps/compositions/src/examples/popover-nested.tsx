import { Button, Text } from "@chakra-ui/react"
import {
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverRoot,
  PopoverTrigger,
} from "compositions/ui/popover"

export const PopoverNested = () => {
  return (
    <PopoverRoot>
      <PopoverTrigger asChild>
        <Button size="sm" variant="outline">
          Click me
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverBody>
          <Text mb="4">
            Naruto is a Japanese manga series written and illustrated by Masashi
            Kishimoto.
          </Text>

          <PopoverRoot>
            <PopoverTrigger asChild>
              <Button variant="outline" size="xs">
                Open Nested Popover
              </Button>
            </PopoverTrigger>
            <PopoverContent portalled={false}>
              <PopoverArrow />
              <PopoverBody>Some nested popover content</PopoverBody>
            </PopoverContent>
          </PopoverRoot>
        </PopoverBody>
      </PopoverContent>
    </PopoverRoot>
  )
}
