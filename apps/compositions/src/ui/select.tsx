"use client"

import { Select as ChakraSelect, Portal } from "@chakra-ui/react"
import { CloseButton } from "./close-button"

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
    </ChakraSelect.Control>
  )
}

export const SelectClearTrigger = () => (
  <ChakraSelect.ClearTrigger asChild>
    <CloseButton size="sm" variant="plain" />
  </ChakraSelect.ClearTrigger>
)

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
  const { item, children, ...rest } = props
  return (
    <ChakraSelect.Item key={item.value} item={item} {...rest}>
      {children}
      <ChakraSelect.ItemIndicator />
    </ChakraSelect.Item>
  )
}

interface SelectValueTextProps
  extends Omit<ChakraSelect.ValueTextProps, "children"> {
  children?(items: any[]): React.ReactNode
}

export const SelectValueText = (props: SelectValueTextProps) => {
  const { children, ...rest } = props
  return (
    <ChakraSelect.ValueText {...rest}>
      <ChakraSelect.Context>
        {(select) => {
          const items = select.selectedItems
          if (items.length === 0) return props.placeholder
          if (children) return children(items)
          if (items.length === 1)
            return select.collection.itemToString(items[0])
          return `${items.length} selected`
        }}
      </ChakraSelect.Context>
    </ChakraSelect.ValueText>
  )
}

export const SelectLabel = ChakraSelect.Label
export const SelectItemGroup = ChakraSelect.ItemGroup
export const SelectItemText = ChakraSelect.ItemText
export const SelectRoot = ChakraSelect.Root
