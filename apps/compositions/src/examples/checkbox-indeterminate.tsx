"use client"

import { Checkbox, Stack } from "@chakra-ui/react"
import { useState } from "react"

const initialValues = [
  { label: "Monday", checked: false, value: "monday" },
  { label: "Tuesday", checked: false, value: "tuesday" },
  { label: "Wednesday", checked: false, value: "wednesday" },
  { label: "Thursday", checked: false, value: "thursday" },
]

export const CheckboxIndeterminate = () => {
  const [values, setValues] = useState(initialValues)

  const allChecked = values.every((value) => value.checked)
  const indeterminate = values.some((value) => value.checked) && !allChecked

  const items = values.map((item, index) => (
    <Checkbox.Root
      ms="6"
      key={item.value}
      checked={item.checked}
      onCheckedChange={(e) => {
        setValues((current) => {
          const newValues = [...current]
          newValues[index] = { ...newValues[index], checked: !!e.checked }
          return newValues
        })
      }}
    >
      <Checkbox.HiddenInput />
      <Checkbox.Control />
      <Checkbox.Label>{item.label}</Checkbox.Label>
    </Checkbox.Root>
  ))

  return (
    <Stack align="flex-start">
      <Checkbox.Root
        checked={indeterminate ? "indeterminate" : allChecked}
        onCheckedChange={(e) => {
          setValues((current) =>
            current.map((value) => ({ ...value, checked: !!e.checked })),
          )
        }}
      >
        <Checkbox.HiddenInput />
        <Checkbox.Control>
          <Checkbox.Indicator />
        </Checkbox.Control>
        <Checkbox.Label>Weekdays</Checkbox.Label>
      </Checkbox.Root>
      {items}
    </Stack>
  )
}
