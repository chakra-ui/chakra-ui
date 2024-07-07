import { Button } from "compositions/ui/button"
import {
  PopoverBody,
  PopoverContent,
  PopoverRoot,
  PopoverTrigger,
} from "compositions/ui/popover"

export const PopoverWithPlacement = () => {
  return (
    <PopoverRoot positioning={{ placement: "bottom-end" }}>
      <PopoverTrigger>
        <Button size="sm" variant="outline">
          Click me
        </Button>
      </PopoverTrigger>
      <PopoverContent showArrow>
        <PopoverBody>Some content</PopoverBody>
      </PopoverContent>
    </PopoverRoot>
  )
}
