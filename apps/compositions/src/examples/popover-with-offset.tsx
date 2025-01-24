import { Button } from "@chakra-ui/react"
import {
  PopoverBody,
  PopoverContent,
  PopoverRoot,
  PopoverTrigger,
} from "compositions/ui/popover"

export const PopoverWithOffset = () => {
  return (
    <PopoverRoot positioning={{ offset: { crossAxis: 0, mainAxis: 0 } }}>
      <PopoverTrigger asChild>
        <Button size="sm" variant="outline">
          Open
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverBody>
          This is a popover with the same width as the trigger button
        </PopoverBody>
      </PopoverContent>
    </PopoverRoot>
  )
}
