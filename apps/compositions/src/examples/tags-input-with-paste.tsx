"use client"

import { TagsInput } from "@chakra-ui/react"

export const TagsInputWithPaste = () => (
  <TagsInput.Root addOnPaste delimiter=",">
    <TagsInput.Label>Paste Tags</TagsInput.Label>
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

      <TagsInput.Input placeholder="Paste comma-separated tags..." />
      <TagsInput.ClearTrigger />
    </TagsInput.Control>

    <TagsInput.HiddenInput />
  </TagsInput.Root>
)
