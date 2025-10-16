"use client"

import { TagsInput } from "@chakra-ui/react"

export const TagsInputWithBlurBehavior = () => (
  <TagsInput.Root blurBehavior="add">
    <TagsInput.Label>Create Tag on Blur</TagsInput.Label>
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

      <TagsInput.Input placeholder="Type and blur to create tag..." />
      <TagsInput.ClearTrigger />
    </TagsInput.Control>

    <TagsInput.HiddenInput />
  </TagsInput.Root>
)
