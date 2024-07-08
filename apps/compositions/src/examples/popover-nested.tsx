import { Text } from "@chakra-ui/react"
import { Button } from "compositions/ui/button"
import {
  PopoverBody,
  PopoverContent,
  PopoverRoot,
  PopoverTrigger,
} from "compositions/ui/popover"

export const PopoverNested = () => {
  return (
    <PopoverRoot>
      <PopoverTrigger>
        <Button size="sm" variant="outline">
          Click me
        </Button>
      </PopoverTrigger>
      <PopoverContent showArrow>
        <PopoverBody>
          <Text>
            Naruto is a Japanese manga series written and illustrated by Masashi
            Kishimoto.
          </Text>

          <PopoverRoot>
            <PopoverTrigger>
              <Button size="sm">Open Nested Popover</Button>
            </PopoverTrigger>
            <PopoverContent showArrow portalled={false}>
              <PopoverBody>Some nested popover content</PopoverBody>
            </PopoverContent>
          </PopoverRoot>
        </PopoverBody>
      </PopoverContent>
    </PopoverRoot>
  )
}
