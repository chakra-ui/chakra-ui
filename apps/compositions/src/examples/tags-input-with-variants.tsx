"use client"

import { For, Span, Stack, TagsInput } from "@chakra-ui/react"

export const TagsInputWithVariants = () => {
  return (
    <Stack>
      <For each={["outline", "subtle", "flushed"]}>
        {(variant) => (
          <TagsInput.Root
            key={variant}
            variant={variant}
            readOnly
            defaultValue={["React", "Chakra", "TypeScript"]}
          >
            <TagsInput.Label>Tags (variant={variant})</TagsInput.Label>
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
