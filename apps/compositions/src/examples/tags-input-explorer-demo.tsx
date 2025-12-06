"use client"

import { Stack, TagsInput } from "@chakra-ui/react"

export const TagsInputExplorerDemo = () => {
  return (
    <Stack gap="4" maxW="400px" p="4">
      <TagsInput.Root defaultValue={["React", "Chakra"]}>
        <TagsInput.Label>Add Tags</TagsInput.Label>

        <TagsInput.Control>
          <TagsInput.Items />

          <TagsInput.Input placeholder="Add tag..." />
          <TagsInput.ClearTrigger />
        </TagsInput.Control>

        <TagsInput.HiddenInput />
      </TagsInput.Root>
    </Stack>
  )
}
