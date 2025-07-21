"use client"

import {
  Combobox,
  HStack,
  Icon,
  Portal,
  Stack,
  Text,
  createListCollection,
} from "@chakra-ui/react"
import { useMemo, useState } from "react"

interface Tag {
  id: string
  name: string
  custom?: boolean
}

const defaultTags: Tag[] = [
  { id: "react", name: "react" },
  { id: "typescript", name: "typescript" },
  { id: "javascript", name: "javascript" },
  { id: "nextjs", name: "nextjs" },
]

export const ComboboxWithCreateableOptions = () => {
  const [tags, setTags] = useState<Tag[]>(defaultTags)
  const [inputValue, setInputValue] = useState("")
  const [value, setValue] = useState<string[]>([])

  const collection = useMemo(
    () =>
      createListCollection({
        items: tags,
        itemToString: (item) => item.name,
        itemToValue: (item) => item.id,
      }),
    [tags],
  )

  const handleValueChange = (details: Combobox.ValueChangeDetails) => {
    const selectedValue = details.value[0]

    const selectedTag = collection.find(selectedValue)

    const tempTags = tags.map((tag) => {
      if (tag.id === "custom" && selectedTag) {
        return { id: selectedTag.name, name: selectedTag.name, custom: true }
      }

      return tag
    })

    setValue(
      selectedValue === "custom" && selectedTag
        ? [selectedTag?.name]
        : details.value,
    )
    setTags(tempTags)

    setInputValue(selectedTag?.name ?? "")
  }

  const handleInputChange = (details: Combobox.InputValueChangeDetails) => {
    const value = details.inputValue

    if (!value) {
      return
    }

    const newTag: Tag = {
      id: "custom",
      name: value,
    }

    setTags((prev) => {
      if (collection.has("custom")) {
        return prev.map((tag) => {
          if (tag.id === "custom") {
            return newTag
          }
          return tag
        })
      }

      return [newTag, ...prev]
    })

    setInputValue(value)
  }

  return (
    <Stack gap={4} maxW="320px">
      <Combobox.Root
        allowCustomValue
        value={value}
        collection={collection}
        inputValue={inputValue}
        selectionBehavior="preserve"
        placeholder="Type to search or create..."
        onValueChange={handleValueChange}
        onInputValueChange={handleInputChange}
      >
        <Combobox.Label>Add Tags</Combobox.Label>

        <Combobox.Control>
          <Combobox.Input />
          <Combobox.IndicatorGroup>
            <Combobox.ClearTrigger />
            <Combobox.Trigger />
          </Combobox.IndicatorGroup>
        </Combobox.Control>

        <Portal>
          <Combobox.Positioner>
            <Combobox.Content>
              {collection.items.map((tag) => {
                if (tag.id === "custom") {
                  return (
                    <Combobox.Item item={tag} key={tag.id}>
                      <Stack direction="row" align="center" gap={2}>
                        <Icon asChild fontSize={16} color="blue.500">
                          <svg
                            width="24"
                            height="24"
                            fill="none"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M5 12h14" />
                            <path d="M12 5v14" />
                          </svg>
                        </Icon>
                        <Text>Create &quot;{inputValue}&quot;</Text>
                      </Stack>
                      <Combobox.ItemIndicator />
                    </Combobox.Item>
                  )
                }

                return (
                  <Combobox.Item key={tag.id} item={tag}>
                    <HStack
                      direction="row"
                      justify="space-between"
                      align="center"
                    >
                      <Stack direction="row" align="center" gap={2}>
                        <Text fontWeight="medium">{tag.name}</Text>
                        {tag.custom && (
                          <Text
                            fontSize="xs"
                            color="blue.500"
                            fontWeight="medium"
                          >
                            CUSTOM
                          </Text>
                        )}
                      </Stack>
                    </HStack>
                    <Combobox.ItemIndicator />
                  </Combobox.Item>
                )
              })}
            </Combobox.Content>
          </Combobox.Positioner>
        </Portal>
      </Combobox.Root>

      <Stack>
        <Text fontWeight="medium">Current Tags:</Text>
        <Stack direction="row" flexWrap="wrap" gap={2}>
          {tags.map((tag) => (
            <Text
              key={tag.id}
              px={2}
              py={1}
              fontSize="sm"
              borderRadius="md"
              backgroundColor={tag.custom ? "blue.100" : "gray.100"}
            >
              {tag.name}
            </Text>
          ))}
        </Stack>
      </Stack>
    </Stack>
  )
}
