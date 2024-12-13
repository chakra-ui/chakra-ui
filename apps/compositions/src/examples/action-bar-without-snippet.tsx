"use client"

import { ActionBar, Button, Checkbox, Portal } from "@chakra-ui/react"
import { useState } from "react"
import { LuShare, LuTrash2 } from "react-icons/lu"

export const ActionBarWithoutSnippet = () => {
  const [checked, setChecked] = useState(false)
  return (
    <>
      <Checkbox.Root onCheckedChange={(e) => setChecked(!!e.checked)}>
        <Checkbox.HiddenInput />
        <Checkbox.Control />
        <Checkbox.Label>Show Action bar</Checkbox.Label>
      </Checkbox.Root>

      <ActionBar.Root open={checked}>
        <Portal>
          <ActionBar.Positioner>
            <ActionBar.Content>
              <ActionBar.SelectionTrigger>
                2 selected
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
    </>
  )
}
