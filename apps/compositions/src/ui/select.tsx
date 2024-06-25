"use client"

import { Select as ChakraSelect, Portal } from "@chakra-ui/react"
import { useMemo } from "react"

interface Item {
  label: string
  value: string
  disabled?: boolean
}

export interface SelectProps extends Omit<ChakraSelect.RootProps, "items"> {
  items: Array<string | Item>
}

function normalizeItem(item: string | Item): Item {
  return typeof item === "string" ? { label: item, value: item } : item
}

export const SelectRoot = (props: SelectProps) => {
  const { items, ...rest } = props
  const normalizedItems = useMemo(() => items.map(normalizeItem), [items])
  return (
    <ChakraSelect.Root
      {...rest}
      positioning={{ sameWidth: true, ...rest.positioning }}
      items={normalizedItems}
    />
  )
}

interface SelectTriggerProps extends ChakraSelect.ControlProps {
  clearable?: boolean
}

export const SelectTrigger = (props: SelectTriggerProps) => {
  const { clearable, children, ...rest } = props
  return (
    <ChakraSelect.Control {...rest}>
      <ChakraSelect.Trigger>
        {children}
        <ChakraSelect.Indicator />
      </ChakraSelect.Trigger>
      {clearable && <ChakraSelect.ClearTrigger />}
    </ChakraSelect.Control>
  )
}

interface SelectContentProps extends ChakraSelect.ContentProps {
  portalled?: boolean
  containerRef?: React.RefObject<HTMLElement>
}

export const SelectContent = (props: SelectContentProps) => {
  const { portalled = true, containerRef, ...rest } = props
  return (
    <Portal disabled={!portalled} container={containerRef}>
      <ChakraSelect.Positioner>
        <ChakraSelect.Content {...rest} />
      </ChakraSelect.Positioner>
    </Portal>
  )
}

export const SelectItem = (props: ChakraSelect.ItemProps) => {
  const { item, ...rest } = props
  return (
    <ChakraSelect.Item key={item.value} item={item} {...rest}>
      <ChakraSelect.ItemText>{item.label}</ChakraSelect.ItemText>
      <ChakraSelect.ItemIndicator />
    </ChakraSelect.Item>
  )
}

export const SelectLabel = ChakraSelect.Label
export const SelectItemGroup = ChakraSelect.ItemGroup

export const SelectValueText = (props: ChakraSelect.ValueTextProps) => {
  return (
    <ChakraSelect.ValueText>
      <ChakraSelect.Context>
        {(select) => {
          const items = select.selectedItems
          if (items.length === 0) return props.placeholder
          if (items.length === 1)
            return select.collection.itemToString(items[0])
          return `${items.length} selected`
        }}
      </ChakraSelect.Context>
    </ChakraSelect.ValueText>
  )
}
