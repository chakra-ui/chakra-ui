"use client"

import { ActionBar, Button, Checkbox, Dialog, Portal } from "@chakra-ui/react"
import { useState } from "react"
import { LuSquarePlus, LuTrash2 } from "react-icons/lu"

export const ActionBarWithDialog = () => {
  const [checked, setChecked] = useState(false)
  return (
    <>
      <Checkbox.Root onCheckedChange={(e) => setChecked(!!e.checked)}>
        <Checkbox.HiddenInput />
        <Checkbox.Control />
        <Checkbox.Label>Check to select projects</Checkbox.Label>
      </Checkbox.Root>
      <ActionBar.Root open={checked}>
        <Portal>
          <ActionBar.Positioner>
            <ActionBar.Content>
              <ActionBar.SelectionTrigger>
                4 selected
              </ActionBar.SelectionTrigger>

              <ActionBar.Separator />

              <Button variant="outline" size="sm">
                <LuSquarePlus />
                Add to collection
              </Button>

              <Dialog.Root placement="center">
                <Dialog.Trigger asChild>
                  <Button variant="surface" colorPalette="red" size="sm">
                    <LuTrash2 />
                    Delete projects
                  </Button>
                </Dialog.Trigger>
                <Portal>
                  <Dialog.Backdrop />
                  <Dialog.Positioner>
                    <Dialog.Content>
                      <Dialog.Header>
                        <Dialog.Title>Delete projects</Dialog.Title>
                      </Dialog.Header>
                      <Dialog.Body>
                        <Dialog.Description>
                          Are you sure you want to delete 4 projects?
                        </Dialog.Description>
                      </Dialog.Body>
                      <Dialog.Footer>
                        <Button variant="outline">Cancel</Button>
                        <Button colorPalette="red">Delete</Button>
                      </Dialog.Footer>
                    </Dialog.Content>
                  </Dialog.Positioner>
                </Portal>
              </Dialog.Root>
            </ActionBar.Content>
          </ActionBar.Positioner>
        </Portal>
      </ActionBar.Root>
    </>
  )
}
