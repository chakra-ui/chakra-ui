"use client"

import { TagsInput } from "@chakra-ui/react"
import { useTagsInput } from "@chakra-ui/react"

export const TagsInputWithStore = () => {
  const tagsStore = useTagsInput()

  return (
    <div>
      <TagsInput.RootProvider value={tagsStore}>
        <TagsInput.Control>
          <TagsInput.Context>
            {({ value }) =>
              value.map((tag, index) => (
                <TagsInput.Item key={index} index={index} value={tag}>
                  <TagsInput.ItemPreview>
                    <TagsInput.ItemText>{tag}</TagsInput.ItemText>
                    <TagsInput.ItemDeleteTrigger />
                  </TagsInput.ItemPreview>
                  <TagsInput.ItemInput />
                </TagsInput.Item>
              ))
            }
          </TagsInput.Context>

          <TagsInput.Input placeholder="Add tag..." />
        </TagsInput.Control>
      </TagsInput.RootProvider>

      <button onClick={() => tagsStore.setValue([])}>Clear All</button>
    </div>
  )
}
