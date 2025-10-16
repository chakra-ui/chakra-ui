"use client"

import { TagsInput } from "@chakra-ui/react"

const SPLIT_REGEX = /[;,]/

export const TagsInputWithDelimiter = () => (
  <TagsInput.Root delimiter={SPLIT_REGEX}>
    <TagsInput.Label>Custom Delimiters (; ,)</TagsInput.Label>
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

      <TagsInput.Input placeholder="Type and use ; or , to create tag..." />
      <TagsInput.ClearTrigger />
    </TagsInput.Control>

    <TagsInput.HiddenInput />
  </TagsInput.Root>
)
