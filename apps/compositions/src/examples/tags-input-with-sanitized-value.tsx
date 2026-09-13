"use client"

import { Span, TagsInput } from "@chakra-ui/react"

export const TagsInputWithSanitizedValue = () => {
  return (
    <TagsInput.Root sanitizeValue={(value) => value.trim().toLowerCase()}>
      <TagsInput.Label>Frameworks</TagsInput.Label>
      <TagsInput.Control>
        <TagsInput.Items />
        <TagsInput.Input placeholder={'Try " React "'} />
      </TagsInput.Control>
      <Span color="fg.muted" textStyle="xs" ms="auto">
        Tags are trimmed and converted to lowercase.
      </Span>
      <TagsInput.HiddenInput />
    </TagsInput.Root>
  )
}
