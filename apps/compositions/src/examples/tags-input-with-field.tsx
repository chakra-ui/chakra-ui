"use client"

import { Field, TagsInput } from "@chakra-ui/react"

export const TagsInputWithField = () => {
  return (
    <Field.Root>
      <TagsInput.Root defaultValue={["React", "Chakra", "TypeScript"]}>
        <TagsInput.Label>Enter tags</TagsInput.Label>
        <TagsInput.Control>
          <TagsInput.Context>
            {({ value }) =>
              value.map((tag, index) => (
                <TagsInput.Item key={index} index={index} value={tag}>
                  <TagsInput.ItemPreview>
                    <TagsInput.ItemText>{tag}</TagsInput.ItemText>
                    <TagsInput.ItemDeleteTrigger />
                  </TagsInput.ItemPreview>
                </TagsInput.Item>
              ))
            }
          </TagsInput.Context>
          <TagsInput.Input placeholder="Add tag..." />
        </TagsInput.Control>
      </TagsInput.Root>
      <Field.HelperText>Add emails separated by commas</Field.HelperText>
    </Field.Root>
  )
}
