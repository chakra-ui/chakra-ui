import { forwardRef } from "react"
import { For, NativeSelect as Select } from "../src"

interface Item {
  value: string
  label: string
  disabled?: boolean
}

export interface NativeSelectProps extends Select.RootProps {
  rootRef?: React.Ref<HTMLDivElement>
  items: Array<string | Item>
  icon?: React.ReactNode
  placeholder?: string
}

function normalize(items: Array<string | Item>): Item[] {
  return items.map((item) => {
    if (typeof item === "string") return { value: item, label: item }
    return item
  })
}

export const NativeSelect = forwardRef<HTMLSelectElement, NativeSelectProps>(
  function NativeSelect(props, ref) {
    const {
      items,
      rootRef,
      icon,
      placeholder = "Select option",
      ...rest
    } = props

    const normalizedItems = normalize(items)

    return (
      <Select.Root ref={rootRef} {...rest}>
        <Select.Field ref={ref} placeholder={placeholder}>
          <For each={normalizedItems}>
            {(item) => (
              <option
                key={item.value}
                value={item.value}
                disabled={item.disabled}
              >
                {item.label}
              </option>
            )}
          </For>
        </Select.Field>
        <Select.Indicator>{icon}</Select.Indicator>
      </Select.Root>
    )
  },
)
