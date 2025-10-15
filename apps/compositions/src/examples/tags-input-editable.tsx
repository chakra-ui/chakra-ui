"use client"

import { Span, TagsInput } from "@chakra-ui/react"

export const TagsInputEditable = () => (
  <TagsInput.Root editable defaultValue={["React", "Chakra"]}>
    <TagsInput.Label>Edit Tags Inline</TagsInput.Label>
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

      <TagsInput.Input placeholder="Add or edit tags..." />
      <TagsInput.ClearTrigger />
    </TagsInput.Control>

    <TagsInput.HiddenInput />

    <Span textStyle="xs" color="fg.muted" ms="auto">
      Use the arrow keys to navigate and press Enter to edit
    </Span>
  </TagsInput.Root>
)
