"use client"

import { Checkbox, useCheckbox } from "@chakra-ui/react"

export const CheckboxWithStore = () => {
  const checkbox = useCheckbox()
  return (
    <Checkbox.RootProvider value={checkbox}>
      <Checkbox.HiddenInput />
      <Checkbox.Control />
      <Checkbox.Label>Accept terms and conditions</Checkbox.Label>
    </Checkbox.RootProvider>
  )
}
