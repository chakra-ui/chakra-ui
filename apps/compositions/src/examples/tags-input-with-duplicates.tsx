"use client"

import { TagsInput } from "@chakra-ui/react"

export const TagsInputWithDuplicates = () => {
  return (
    <TagsInput.Root allowDuplicates defaultValue={["React"]}>
      <TagsInput.Label>Favorite frameworks</TagsInput.Label>
      <TagsInput.Control>
        <TagsInput.Items />
        <TagsInput.Input placeholder={'Add "React" again'} />
      </TagsInput.Control>
      <TagsInput.HiddenInput />
    </TagsInput.Root>
  )
}
