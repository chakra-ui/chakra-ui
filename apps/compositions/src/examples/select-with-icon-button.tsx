"use client"

import {
  HStack,
  IconButton,
  Portal,
  Select,
  createListCollection,
  useSelectContext,
} from "@chakra-ui/react"
import {
  RiAngularjsLine,
  RiForbidLine,
  RiReactjsLine,
  RiSvelteLine,
  RiVuejsLine,
} from "react-icons/ri"

const SelectTrigger = () => {
  const select = useSelectContext()
  const items = select.selectedItems as Framework[]
  return (
    <IconButton
      px="2"
      variant="outline"
      size="sm"
      {...select.getTriggerProps()}
    >
      {select.hasSelectedItems ? items[0].icon : <RiForbidLine />}
    </IconButton>
  )
}

export const SelectWithIconButton = () => {
  return (
    <Select.Root
      positioning={{ sameWidth: false }}
      collection={frameworks}
      size="sm"
      width="320px"
      defaultValue={["react"]}
    >
      <Select.HiddenSelect />
      <Select.Control>
        <SelectTrigger />
      </Select.Control>
      <Portal>
        <Select.Positioner>
          <Select.Content minW="32">
            {frameworks.items.map((framework) => (
              <Select.Item item={framework} key={framework.value}>
                <HStack>
                  {framework.icon}
                  {framework.label}
                </HStack>
                <Select.ItemIndicator />
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Positioner>
      </Portal>
    </Select.Root>
  )
}

const frameworks = createListCollection({
  items: [
    { label: "React.js", value: "react", icon: <RiReactjsLine /> },
    { label: "Vue.js", value: "vue", icon: <RiVuejsLine /> },
    { label: "Angular", value: "angular", icon: <RiAngularjsLine /> },
    { label: "Svelte", value: "svelte", icon: <RiSvelteLine /> },
  ],
})

interface Framework {
  label: string
  value: string
  icon: React.ReactNode
}
