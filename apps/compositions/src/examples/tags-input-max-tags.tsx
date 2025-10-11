"use client"

import { TagsInput } from "@chakra-ui/react"

export const TagsInputMaxTags = () => {
  return (
    <TagsInput.Root max={3}>
      <TagsInput.Label>Tags (max 3)</TagsInput.Label>

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

        <TagsInput.Input placeholder="Add up to 3 tags..." />
      </TagsInput.Control>
    </TagsInput.Root>
  )
}
