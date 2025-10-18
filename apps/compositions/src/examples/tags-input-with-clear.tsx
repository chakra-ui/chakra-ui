"use client"

import { AbsoluteCenter, Span, TagsInput } from "@chakra-ui/react"

export const TagsInputWithClear = () => {
  return (
    <TagsInput.Root defaultValue={["React", "Chakra", "TypeScript"]}>
      <TagsInput.Label>Tags</TagsInput.Label>
      <TagsInput.Control pe="8">
        <TagsInput.Items />
        <TagsInput.Input placeholder="Add tag..." />
        <AbsoluteCenter axis="vertical" insetEnd="3">
          <TagsInput.ClearTrigger />
        </AbsoluteCenter>
      </TagsInput.Control>
      <Span textStyle="xs" color="fg.muted" ms="auto">
        Press Enter or Return to add tag
      </Span>
    </TagsInput.Root>
  )
}
