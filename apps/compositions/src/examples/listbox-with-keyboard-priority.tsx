"use client"

import { Input, Listbox, Text, createListCollection } from "@chakra-ui/react"

export const ListboxWithKeyboardPriority = () => {
  return (
    <Listbox.Root collection={frameworks} maxW="320px">
      <Listbox.Label>Select framework</Listbox.Label>
      <Listbox.Input
        as={Input}
        keyboardPriority="navigate"
        placeholder="Use Home, End, or Arrow keys"
      />
      <Text color="fg.muted" textStyle="xs">
        The navigation keys highlight listbox items instead of moving the text
        caret.
      </Text>
      <Listbox.Content>
        {frameworks.items.map((framework) => (
          <Listbox.Item item={framework} key={framework.value}>
            <Listbox.ItemText>{framework.label}</Listbox.ItemText>
            <Listbox.ItemIndicator />
          </Listbox.Item>
        ))}
      </Listbox.Content>
    </Listbox.Root>
  )
}

const frameworks = createListCollection({
  items: [
    { label: "React.js", value: "react" },
    { label: "Vue.js", value: "vue" },
    { label: "Angular", value: "angular" },
    { label: "Svelte", value: "svelte" },
  ],
})
