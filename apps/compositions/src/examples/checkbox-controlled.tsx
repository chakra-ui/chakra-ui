"use client"

import { Checkbox } from "compositions/ui/checkbox"
import { useState } from "react"

export const CheckboxControlled = () => {
  const [checked, setChecked] = useState(false)
  return (
    <Checkbox
      checked={checked}
      onCheckedChange={(e) => setChecked(!!e.checked)}
    >
      Accept terms and conditions
    </Checkbox>
  )
}
