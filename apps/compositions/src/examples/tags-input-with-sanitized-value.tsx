"use client"

import { TagsInput, Text } from "@chakra-ui/react"

export const TagsInputWithSanitizedValue = () => {
  return (
    <TagsInput.Root sanitizeValue={(value) => value.trim().toLowerCase()}>
      <TagsInput.Label>Frameworks</TagsInput.Label>
      <TagsInput.Control>
        <TagsInput.Items />
        <TagsInput.Input placeholder={'Try " React "'} />
      </TagsInput.Control>
      <Text color="fg.muted" textStyle="xs">
        Tags are trimmed and converted to lowercase.
      </Text>
      <TagsInput.HiddenInput />
    </TagsInput.Root>
  )
}
