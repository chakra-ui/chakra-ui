import { Select as ChakraSelect, Portal, createIcon } from "@chakra-ui/react"
import { useMemo } from "react"

interface Item {
  label: string
  value: string
  disabled?: boolean
}

export interface SelectProps extends Omit<ChakraSelect.RootProps, "items"> {
  label?: React.ReactNode
  items: Array<string | Item>
  placeholder?: string
  portalled?: boolean
}

function normalizeItem(item: string | Item): Item {
  return typeof item === "string" ? { label: item, value: item } : item
}

export const Select = (props: SelectProps) => {
  const { items, label, placeholder, portalled = true, ...rest } = props
  const normalizedItems = useMemo(() => items.map(normalizeItem), [items])

  return (
    <ChakraSelect.Root
      positioning={{ sameWidth: true }}
      {...rest}
      items={items}
    >
      {label && <ChakraSelect.Label>{label}</ChakraSelect.Label>}

      <ChakraSelect.Control>
        <ChakraSelect.Trigger>
          <ChakraSelect.ValueText placeholder={placeholder} />
          <DownIcon />
        </ChakraSelect.Trigger>
      </ChakraSelect.Control>

      <Portal disabled={!portalled}>
        <ChakraSelect.Positioner>
          <ChakraSelect.Content>
            {normalizedItems.map((item) => (
              <ChakraSelect.Item key={item.value} item={item}>
                <ChakraSelect.ItemText>{item.label}</ChakraSelect.ItemText>
                <ChakraSelect.ItemIndicator>
                  <CheckIcon />
                </ChakraSelect.ItemIndicator>
              </ChakraSelect.Item>
            ))}
          </ChakraSelect.Content>
        </ChakraSelect.Positioner>
      </Portal>
    </ChakraSelect.Root>
  )
}

const CheckIcon = createIcon({
  d: "M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z",
})

const DownIcon = createIcon({
  d: "M7.41 8.59 12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z",
})
