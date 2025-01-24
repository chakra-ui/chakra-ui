"use client"

import { DialogHeader } from "@chakra-ui/react"
import { Button } from "@chakra-ui/react"
import {
  ActionBarContent,
  ActionBarRoot,
  ActionBarSelectionTrigger,
  ActionBarSeparator,
} from "compositions/ui/action-bar"
import { Checkbox } from "compositions/ui/checkbox"
import {
  DialogBody,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "compositions/ui/dialog"
import { useState } from "react"
import { LuSquarePlus, LuTrash2 } from "react-icons/lu"

export const ActionBarWithDialog = () => {
  const [checked, setChecked] = useState(false)
  return (
    <>
      <Checkbox onCheckedChange={(e) => setChecked(!!e.checked)}>
        Check to select projects
      </Checkbox>
      <ActionBarRoot open={checked}>
        <ActionBarContent>
          <ActionBarSelectionTrigger>4 selected</ActionBarSelectionTrigger>

          <ActionBarSeparator />

          <Button variant="outline" size="sm">
            <LuSquarePlus />
            Add to collection
          </Button>

          <DialogRoot placement="center">
            <DialogTrigger asChild>
              <Button variant="surface" colorPalette="red" size="sm">
                <LuTrash2 />
                Delete projects
              </Button>
            </DialogTrigger>

            <DialogContent>
              <DialogHeader>
                <DialogTitle>Delete projects</DialogTitle>
              </DialogHeader>
              <DialogBody>
                <DialogDescription>
                  Are you sure you want to delete 4 projects?
                </DialogDescription>
              </DialogBody>
              <DialogFooter>
                <Button variant="outline">Cancel</Button>
                <Button colorPalette="red">Delete</Button>
              </DialogFooter>
            </DialogContent>
          </DialogRoot>
        </ActionBarContent>
      </ActionBarRoot>
    </>
  )
}
