"use client"

import type { CollectionItem } from "@chakra-ui/react"
import { Select as ChakraSelect, Portal } from "@chakra-ui/react"
import { CloseButton } from "compositions/ui/close-button"

interface SelectTriggerProps extends ChakraSelect.ControlProps {}

export const SelectTrigger = (props: SelectTriggerProps) => {
  const { children, ...rest } = props
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
    <CloseButton size="sm" variant="ghost" />
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
  children?(items: CollectionItem[]): React.ReactNode
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
            return select.collection.stringifyItem(items[0])
          return `${items.length} selected`
        }}
      </ChakraSelect.Context>
    </ChakraSelect.ValueText>
  )
}

export const SelectRoot = (props: ChakraSelect.RootProps) => {
  return (
    <ChakraSelect.Root
      {...props}
      positioning={{ sameWidth: true, ...props.positioning }}
    />
  )
}

export const SelectLabel = ChakraSelect.Label
export const SelectItemGroup = ChakraSelect.ItemGroup
export const SelectItemText = ChakraSelect.ItemText
export const SelectItemGroupLabel = ChakraSelect.ItemGroupLabel
