"use client"

import { NativeSelect as Select } from "@chakra-ui/react"
import * as React from "react"

type FieldProp = "name" | "value" | "onChange" | "defaultValue"

interface NativeSelectProps
  extends Omit<Select.RootProps, FieldProp>,
    Pick<Select.FieldProps, FieldProp> {
  icon?: React.ReactNode
  items: Array<{ label: string; value: string; disabled?: boolean }>
}

export const NativeSelect = React.forwardRef<
  HTMLSelectElement,
  NativeSelectProps
>(function NativeSelect(props, ref) {
  const {
    icon,
    children,
    name,
    items,
    value,
    defaultValue,
    onChange,
    ...rest
  } = props
  return (
    <Select.Root {...rest}>
      <Select.Field
        ref={ref}
        name={name}
        value={value}
        defaultValue={defaultValue}
        onChange={onChange}
      >
        {children}
        {items?.map((item) => (
          <option key={item.value} value={item.value} disabled={item.disabled}>
            {item.label}
          </option>
        ))}
      </Select.Field>
      <Select.Indicator>{icon}</Select.Indicator>
    </Select.Root>
  )
})
