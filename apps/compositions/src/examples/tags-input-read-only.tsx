"use client"

import { TagsInput } from "@chakra-ui/react"

export const TagsInputReadOnly = () => (
  <TagsInput.Root readOnly defaultValue={["React", "Chakra"]}>
    <TagsInput.Label>Read Only Tags</TagsInput.Label>
    <TagsInput.Control>
      <TagsInput.Items />

      <TagsInput.Input placeholder="Read-only..." />
    </TagsInput.Control>

    <TagsInput.HiddenInput />
  </TagsInput.Root>
)
