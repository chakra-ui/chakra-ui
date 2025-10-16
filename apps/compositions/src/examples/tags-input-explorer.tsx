"use client"

import { Stack, TagsInput } from "@chakra-ui/react"

export const TagsInputExplorer = () => {
  return (
    <Stack gap="4" maxW="400px" p="4">
      <TagsInput.Root defaultValue={["React", "Chakra"]}>
        <TagsInput.Label>Add Tags</TagsInput.Label>

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
          <TagsInput.ClearTrigger />
        </TagsInput.Control>

        <TagsInput.HiddenInput />
      </TagsInput.Root>
    </Stack>
  )
}
