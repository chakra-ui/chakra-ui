"use client"

import { TagsInput } from "@chakra-ui/react"

export const TagsInputWithBlurBehavior = () => (
  <TagsInput.Root blurBehavior="add">
    <TagsInput.Label>Create Tag on Blur</TagsInput.Label>
    <TagsInput.Control>
      <TagsInput.Items />

      <TagsInput.Input placeholder="Type and blur to create tag..." />
      <TagsInput.ClearTrigger />
    </TagsInput.Control>

    <TagsInput.HiddenInput />
  </TagsInput.Root>
)
