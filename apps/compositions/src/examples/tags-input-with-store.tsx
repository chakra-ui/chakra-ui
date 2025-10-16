"use client"

import { Button, Stack, TagsInput } from "@chakra-ui/react"
import { useTagsInput } from "@chakra-ui/react"

export const TagsInputWithStore = () => {
  const tags = useTagsInput()

  return (
    <Stack align="flex-start" gap="4">
      <TagsInput.RootProvider value={tags}>
        <TagsInput.Label>Tags: {JSON.stringify(tags.value)}</TagsInput.Label>
        <TagsInput.Control>
          {tags.value.map((tag, index) => (
            <TagsInput.Item key={index} index={index} value={tag}>
              <TagsInput.ItemPreview>
                <TagsInput.ItemText>{tag}</TagsInput.ItemText>
                <TagsInput.ItemDeleteTrigger />
              </TagsInput.ItemPreview>
              <TagsInput.ItemInput />
            </TagsInput.Item>
          ))}
          <TagsInput.Input placeholder="Add tag..." />
        </TagsInput.Control>
      </TagsInput.RootProvider>

      <Button variant="outline" size="sm" onClick={() => tags.clearValue()}>
        Clear All
      </Button>
    </Stack>
  )
}
