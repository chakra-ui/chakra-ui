"use client"

import {
  ActionBar,
  Button,
  Portal,
  SegmentGroup,
  Text,
  VStack,
} from "@chakra-ui/react"
import { useState } from "react"
import { LuShare, LuTrash2 } from "react-icons/lu"

export const ActionBarPlacement = () => {
  const [placement, setPlacement] = useState<
    "bottom" | "bottom-start" | "bottom-end"
  >("bottom")
  const [open, setOpen] = useState(false)

  return (
    <VStack gap="6" align="flex-start">
      <VStack gap="3" align="flex-start">
        <Text fontWeight="medium">Placement:</Text>
        <SegmentGroup.Root
          size="sm"
          value={placement}
          onValueChange={(e) =>
            setPlacement(e.value as "bottom" | "bottom-start" | "bottom-end")
          }
        >
          <SegmentGroup.Indicator />
          <SegmentGroup.Items
            items={[
              { value: "bottom-start", label: "Bottom Start" },
              { value: "bottom", label: "Bottom" },
              { value: "bottom-end", label: "Bottom End" },
            ]}
          />
        </SegmentGroup.Root>
      </VStack>

      <Button onClick={() => setOpen(!open)}>
        {open ? "Hide" : "Show"} Action Bar
      </Button>

      <ActionBar.Root open={open} placement={placement}>
        <Portal>
          <ActionBar.Positioner>
            <ActionBar.Content>
              <ActionBar.SelectionTrigger>
                3 selected
              </ActionBar.SelectionTrigger>
              <ActionBar.Separator />
              <Button variant="outline" size="sm">
                <LuTrash2 />
                Delete
              </Button>
              <Button variant="outline" size="sm">
                <LuShare />
                Share
              </Button>
            </ActionBar.Content>
          </ActionBar.Positioner>
        </Portal>
      </ActionBar.Root>
    </VStack>
  )
}
