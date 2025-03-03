"use client"

import { Box, Button } from "@chakra-ui/react"
import {
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
} from "compositions/ui/menu"
import { useRef } from "react"

export const MenuWithAnchorRect = () => {
  const ref = useRef<HTMLDivElement | null>(null)

  return (
    <MenuRoot
      positioning={{
        getAnchorRect() {
          return ref.current!.getBoundingClientRect()
        },
      }}
    >
      <MenuTrigger asChild>
        <Button variant="outline" size="sm">
          Open
        </Button>
      </MenuTrigger>
      <Box layerStyle="fill.subtle" p="4" ref={ref} mt="4">
        Anchor
      </Box>
      <MenuContent>
        <MenuItem value="new-txt">New Text File</MenuItem>
        <MenuItem value="new-file">New File...</MenuItem>
        <MenuItem value="new-win">New Window</MenuItem>
        <MenuItem value="open-file">Open File...</MenuItem>
        <MenuItem value="export">Export</MenuItem>
      </MenuContent>
    </MenuRoot>
  )
}
