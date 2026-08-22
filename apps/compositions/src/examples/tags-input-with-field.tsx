"use client"

import { Field, TagsInput } from "@chakra-ui/react"

export const TagsInputWithField = () => {
  return (
    <Field.Root>
      <TagsInput.Root defaultValue={["React", "Chakra", "TypeScript"]}>
        <TagsInput.Label>Enter tags</TagsInput.Label>
        <TagsInput.Control>
          <TagsInput.Items />
          <TagsInput.Input placeholder="Add tag..." />
        </TagsInput.Control>
      </TagsInput.Root>
      <Field.HelperText>Add emails separated by commas</Field.HelperText>
    </Field.Root>
  )
}
