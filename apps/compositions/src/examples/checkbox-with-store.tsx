"use client"

import { Checkbox, useCheckbox } from "@sh3yk0-ui/react"

export const CheckboxWithStore = () => {
  const checkbox = useCheckbox()
  return (
    <Checkbox.RootProvider value={checkbox}>
      <Checkbox.Root>
        <Checkbox.HiddenInput />
        <Checkbox.Control />
        <Checkbox.Label>Accept terms and conditions</Checkbox.Label>
      </Checkbox.Root>
    </Checkbox.RootProvider>
  )
}
