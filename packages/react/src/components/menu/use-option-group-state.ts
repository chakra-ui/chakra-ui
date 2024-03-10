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

  const [value, setValue] = useControllableState({
    defaultValue: defaultValue ?? fallback,
    value: valueProp,
    onChange: onChangeProp,
  })

  const onChange = useCallback(
    (selectedValue: string) => {
      if (type === "radio" && typeof value === "string") {
        setValue(selectedValue)
      }

      if (type === "checkbox" && Array.isArray(value)) {
        const nextValue = value.includes(selectedValue)
          ? value.filter((item) => item !== selectedValue)
          : value.concat(selectedValue)

        setValue(nextValue)
      }
    },
    [value, setValue, type],
  )

  const isChecked = (itemValue: string) => {
    return type === "radio" ? itemValue === value : value.includes(itemValue)
  }

  return {
    type,
    value,
    isChecked,
    onChange,
  }
}

export type UseOptionGroupStateReturn = ReturnType<typeof useOptionGroupState>
