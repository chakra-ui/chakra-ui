"use client"

import { Box, Button, Group } from "@chakra-ui/react"
import {
  PopoverArrow,
  PopoverBody,
  PopoverCloseTrigger,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverRoot,
  PopoverTrigger,
} from "compositions/ui/popover"
import { useRef } from "react"

export const PopoverWithInitialFocus = () => {
  const ref = useRef<HTMLButtonElement>(null)
  return (
    <PopoverRoot initialFocusEl={() => ref.current}>
      <PopoverTrigger asChild>
        <Button size="sm" variant="outline">
          Click me
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverHeader>Manage Your Channels</PopoverHeader>
        <PopoverArrow />
        <PopoverBody>
          This is a popover with the same width as the trigger button
        </PopoverBody>
        <PopoverFooter>
          <Box fontSize="sm" flex="1">
            Step 2 of 4
          </Box>
          <Group>
            <Button size="sm" ref={ref}>
              Prev
            </Button>
            <Button size="sm">Next</Button>
          </Group>
        </PopoverFooter>
        <PopoverCloseTrigger />
      </PopoverContent>
    </PopoverRoot>
  )
}
