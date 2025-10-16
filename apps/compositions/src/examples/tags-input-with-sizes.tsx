"use client"

import { For, Span, Stack, TagsInput } from "@chakra-ui/react"

export const TagsInputWithSizes = () => {
  return (
    <Stack>
      <For each={["xs", "sm", "md", "lg"]}>
        {(size) => (
          <TagsInput.Root
            key={size}
            size={size}
            readOnly
            defaultValue={["React", "Chakra", "TypeScript"]}
          >
            <TagsInput.Label>Tags (size={size})</TagsInput.Label>
            <TagsInput.Control>
              <TagsInput.Items />
              <TagsInput.Input placeholder="Add tag..." />
            </TagsInput.Control>
            <Span textStyle="xs" color="fg.muted" ms="auto">
              Press Enter or Return to add tag
            </Span>
          </TagsInput.Root>
        )}
      </For>
    </Stack>
  )
}
