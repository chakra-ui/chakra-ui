import { Button } from "compositions/ui/button"
import {
  PopoverBody,
  PopoverContent,
  PopoverRoot,
  PopoverTrigger,
} from "compositions/ui/popover"

export const PopoverWithSameWidth = () => {
  return (
    <PopoverRoot positioning={{ sameWidth: true }}>
      <PopoverTrigger>
        <Button size="sm" variant="outline" minW="200px">
          Click me
        </Button>
      </PopoverTrigger>
      <PopoverContent showArrow>
        <PopoverBody>
          This is a popover with the same width as the trigger button
        </PopoverBody>
      </PopoverContent>
    </PopoverRoot>
  )
}
