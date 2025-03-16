"use client"

import {
  Avatar,
  HStack,
  Select,
  createListCollection,
  useSelectContext,
} from "@chakra-ui/react"

const SelectValue = () => {
  const select = useSelectContext()
  const items = select.selectedItems as Array<{ name: string; avatar: string }>
  const { name, avatar } = items[0]
  return (
    <Select.ValueText placeholder="Select member">
      <HStack>
        <Avatar.Root shape="rounded" size="2xs">
          <Avatar.Image src={avatar} alt={name} />
          <Avatar.Fallback name={name} />
        </Avatar.Root>
        {name}
      </HStack>
    </Select.ValueText>
  )
}

export const SelectWithAvatar = () => {
  return (
    <Select.Root
      collection={members}
      size="sm"
      width="240px"
      defaultValue={["jessica_jones"]}
      positioning={{ sameWidth: true }}
    >
      <Select.HiddenSelect />
      <Select.Label>Select member</Select.Label>
      <Select.Control>
        <Select.Trigger>
          <SelectValue />
        </Select.Trigger>
        <Select.IndicatorGroup>
          <Select.Indicator />
        </Select.IndicatorGroup>
      </Select.Control>
      <Select.Positioner>
        <Select.Content>
          {members.items.map((item) => (
            <Select.Item item={item} key={item.id} justifyContent="flex-start">
              <Avatar.Root shape="rounded" size="2xs">
                <Avatar.Image src={item.avatar} alt={item.name} />
                <Avatar.Fallback name={item.name} />
              </Avatar.Root>
              {item.name}
              <Select.ItemIndicator />
            </Select.Item>
          ))}
        </Select.Content>
      </Select.Positioner>
    </Select.Root>
  )
}

const members = createListCollection({
  items: [
    {
      name: "Jessica Jones",
      id: "jessica_jones",
      avatar:
        "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=100",
    },
    {
      name: "Kenneth Johnson",
      id: "kenneth_johnson",
      avatar:
        "https://images.unsplash.com/photo-1523477800337-966dbabe060b?w=100",
    },
    {
      name: "Kate Wilson",
      id: "kate_wilson",
      avatar:
        "https://images.unsplash.com/photo-1609712409631-dbbb050746d1?w=100",
    },
  ],
  itemToString: (item) => item.name,
  itemToValue: (item) => item.id,
})
