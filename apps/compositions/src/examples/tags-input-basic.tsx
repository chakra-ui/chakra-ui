"use client"

import { TagsInput } from "@chakra-ui/react"

export const TagsInputBasic = () => {
  return (
    <TagsInput.Root defaultValue={["React", "Chakra", "TypeScript"]}>
      <TagsInput.Label>Tags</TagsInput.Label>
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
    </TagsInput.Root>
  )
}
