"use client"

import { TagsInput } from "@chakra-ui/react"

export const TagsInputDisabled = () => (
  <TagsInput.Root disabled defaultValue={["React", "Chakra"]}>
    <TagsInput.Label>Disabled Tags</TagsInput.Label>

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

      <TagsInput.Input placeholder="Can't type here" />
    </TagsInput.Control>

    <TagsInput.HiddenInput />
  </TagsInput.Root>
)
