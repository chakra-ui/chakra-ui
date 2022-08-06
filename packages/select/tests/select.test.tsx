import * as React from "react"
import { render, testA11y } from "@chakra-ui/test-utils"
import { Select, SelectTrigger, SelectMenu, SelectOption } from "../src"

const TestEnvironment = () => {
  return (
    <Select>
      <SelectTrigger />
      <SelectMenu>
        <SelectOption value="value-1">Option 1</SelectOption>
        <SelectOption value="value-2">Option 2</SelectOption>
        <SelectOption value="value-3">Option 3</SelectOption>
        <SelectOption value="value-4">Option 4</SelectOption>
      </SelectMenu>
    </Select>
  )
}
