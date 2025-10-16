"use client"

import { Field, TagsInput } from "@chakra-ui/react"

export const TagsInputInvalid = () => (
  <Field.Root invalid>
    <TagsInput.Root defaultValue={["React", "Chakra"]}>
      <TagsInput.Label>Invalid Tags</TagsInput.Label>
      <TagsInput.Control>
        <TagsInput.Items />

        <TagsInput.Input placeholder="Add tags..." />
      </TagsInput.Control>

      <TagsInput.HiddenInput />
    </TagsInput.Root>
    <Field.ErrorText>This is an error</Field.ErrorText>
  </Field.Root>
)
