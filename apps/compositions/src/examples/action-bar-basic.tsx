"use client"

import { Button } from "@chakra-ui/react"
import {
  ActionBarContent,
  ActionBarRoot,
  ActionBarSelectionTrigger,
  ActionBarSeparator,
} from "compositions/ui/action-bar"
import { Checkbox } from "compositions/ui/checkbox"
import { useState } from "react"
import { LuShare, LuTrash2 } from "react-icons/lu"

export const ActionBarBasic = () => {
  const [checked, setChecked] = useState(false)
  return (
    <>
      <Checkbox onCheckedChange={(e) => setChecked(!!e.checked)}>
        Show Action bar
      </Checkbox>
      <ActionBarRoot open={checked}>
        <ActionBarContent>
          <ActionBarSelectionTrigger>2 selected</ActionBarSelectionTrigger>
          <ActionBarSeparator />
          <Button variant="outline" size="sm">
            <LuTrash2 />
            Delete
          </Button>
          <Button variant="outline" size="sm">
            <LuShare />
            Share
          </Button>
        </ActionBarContent>
      </ActionBarRoot>
    </>
  )
}
