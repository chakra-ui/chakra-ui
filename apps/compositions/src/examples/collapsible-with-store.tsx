"use client"

import {
  Box,
  Button,
  Collapsible,
  Icon,
  Stack,
  useCollapsible,
} from "@chakra-ui/react"
import { LuChevronDown, LuChevronRight } from "react-icons/lu"

export const CollapsibleWithStore = () => {
  const collapsible = useCollapsible()

  return (
    <Stack gap="4" align="flex-start">
      <Box fontWeight="medium">
        State: {collapsible.visible ? "Expanded" : "Collapsed"}
      </Box>

      <Button
        size="sm"
        variant="subtle"
        onClick={() => collapsible.setOpen(!collapsible.open)}
      >
        Toggle
        <Icon>{collapsible.open ? <LuChevronRight /> : <LuChevronDown />}</Icon>
      </Button>

      <Collapsible.RootProvider value={collapsible}>
        <Collapsible.Content>
          <Box padding="4" borderWidth="1px" rounded="l3">
            Using the <code>useCollapsible</code> hook and{" "}
            <code>RootProvider</code> allows you to access the collapsible store
            and control the state from anywhere in your component.
          </Box>
        </Collapsible.Content>
      </Collapsible.RootProvider>
    </Stack>
  )
}
