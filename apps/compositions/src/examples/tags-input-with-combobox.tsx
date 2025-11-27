"use client"

import {
  Combobox,
  TagsInput,
  useCombobox,
  useFilter,
  useListCollection,
  useTagsInput,
} from "@chakra-ui/react"
import { useId, useRef } from "react"

export const TagsInputWithCombobox = () => {
  const { contains } = useFilter({ sensitivity: "base" })

  const { collection, filter } = useListCollection({
    initialItems: [
      "React",
      "Chakra",
      "TypeScript",
      "Next.js",
      "Ark UI",
      "Zag.js",
    ],
    filter: contains,
  })

  const inputId = useId()
  const controlRef = useRef<HTMLDivElement | null>(null)

  const tags = useTagsInput({
    ids: { input: inputId },
  })

  const comobobox = useCombobox({
    ids: { input: inputId },
    collection,
    onInputValueChange(e) {
      filter(e.inputValue)
    },
    positioning: {
      getAnchorRect() {
        return controlRef.current!.getBoundingClientRect()
      },
    },
    value: [],
    allowCustomValue: true,
    onValueChange: (e) => tags.addValue(e.value[0]),
    selectionBehavior: "clear",
  })

  return (
    <Combobox.RootProvider value={comobobox}>
      <TagsInput.RootProvider value={tags}>
        <TagsInput.Label>Tags</TagsInput.Label>

        <TagsInput.Control ref={controlRef}>
          {tags.value.map((tag, index) => (
            <TagsInput.Item key={index} index={index} value={tag}>
              <TagsInput.ItemPreview>
                <TagsInput.ItemText>{tag}</TagsInput.ItemText>
                <TagsInput.ItemDeleteTrigger />
              </TagsInput.ItemPreview>
            </TagsInput.Item>
          ))}

          <Combobox.Input unstyled asChild>
            <TagsInput.Input placeholder="Add tag..." />
          </Combobox.Input>
        </TagsInput.Control>

        <Combobox.Positioner>
          <Combobox.Content>
            <Combobox.Empty>No tags found</Combobox.Empty>
            {collection.items.map((item) => (
              <Combobox.Item item={item} key={item}>
                <Combobox.ItemText>{item}</Combobox.ItemText>
                <Combobox.ItemIndicator />
              </Combobox.Item>
            ))}
          </Combobox.Content>
        </Combobox.Positioner>
      </TagsInput.RootProvider>
    </Combobox.RootProvider>
  )
}
