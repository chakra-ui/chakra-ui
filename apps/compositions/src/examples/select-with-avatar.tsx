"use client"

import { Avatar, HStack, createListCollection } from "@chakra-ui/react"
import {
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "compositions/ui/select"

const SelectValueItem = () => (
  <SelectValueText placeholder="Select member">
    {(items: Array<{ name: string; avatar: string }>) => {
      const { name, avatar } = items[0]
      return (
        <HStack>
          <Avatar.Root shape="rounded" size="2xs">
            <Avatar.Image src={avatar} />
            <Avatar.Fallback name={name} />
          </Avatar.Root>
          {name}
        </HStack>
      )
    }}
  </SelectValueText>
)

export const SelectWithAvatar = () => {
  return (
    <SelectRoot
      collection={members}
      size="sm"
      width="240px"
      defaultValue={["jessica_jones"]}
      positioning={{ sameWidth: true }}
    >
      <SelectLabel>Select member</SelectLabel>
      <SelectTrigger>
        <SelectValueItem />
      </SelectTrigger>
      <SelectContent portalled={false}>
        {members.items.map((item) => (
          <SelectItem item={item} key={item.id} justifyContent="flex-start">
            <Avatar.Root shape="rounded" size="2xs">
              <Avatar.Image src={item.avatar} />
              <Avatar.Fallback name={item.name} />
            </Avatar.Root>
            {item.name}
          </SelectItem>
        ))}
      </SelectContent>
    </SelectRoot>
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
