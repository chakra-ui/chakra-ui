import { Button } from "@chakra-ui/react"
import {
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverRoot,
  PopoverTrigger,
} from "compositions/ui/popover"

export const PopoverWithSameWidth = () => {
  return (
    <PopoverRoot positioning={{ sameWidth: true }}>
      <PopoverTrigger asChild>
        <Button size="sm" variant="outline" minW="xs">
          Click me
        </Button>
      </PopoverTrigger>
      <PopoverContent width="auto">
        <PopoverArrow />
        <PopoverBody>
          This is a popover with the same width as the trigger button
        </PopoverBody>
      </PopoverContent>
    </PopoverRoot>
  )
}
