"use client"

import { Stack } from "@chakra-ui/react"
import { Checkbox } from "compositions/ui/checkbox"
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
    <Checkbox
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
      {item.label}
    </Checkbox>
  ))

  return (
    <Stack align="flex-start">
      <Checkbox
        checked={indeterminate ? "indeterminate" : allChecked}
        onCheckedChange={(e) => {
          setValues((current) =>
            current.map((value) => ({ ...value, checked: !!e.checked })),
          )
        }}
      >
        Weekdays
      </Checkbox>
      {items}
    </Stack>
  )
}
