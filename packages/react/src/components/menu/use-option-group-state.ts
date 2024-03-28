"use client"

import { useControllableState } from "@chakra-ui/hooks"
import { useCallback } from "react"

export interface UseMenuOptionGroupProps {
  value?: string | string[]
  defaultValue?: string | string[]
  type?: "radio" | "checkbox"
  onChange?: (value: string | string[]) => void
}

export function useOptionGroupState(props: UseMenuOptionGroupProps = {}) {
  const {
    type = "radio",
    value: valueProp,
    defaultValue,
    onChange: onChangeProp,
  } = props

  const isRadio = type === "radio"

  const fallback = isRadio ? "" : []

  const [value, setValueFn] = useControllableState({
    defaultValue: defaultValue ?? fallback,
    value: valueProp,
    onChange: onChangeProp,
  })

  const setValue = useCallback(
    (itemValue: string) => {
      if (type === "radio" && typeof value === "string") {
        setValueFn(itemValue)
      }

      if (type === "checkbox" && Array.isArray(value)) {
        const nextValue = value.includes(itemValue)
          ? value.filter((item) => item !== itemValue)
          : value.concat(itemValue)

        setValueFn(nextValue)
      }
    },
    [setValueFn, type, value],
  )

  const checked = (itemValue: string) => {
    return type === "radio" ? itemValue === value : value.includes(itemValue)
  }

  return {
    type,
    value,
    checked,
    setValue,
  }
}

export type UseOptionGroupStateReturn = ReturnType<typeof useOptionGroupState>
