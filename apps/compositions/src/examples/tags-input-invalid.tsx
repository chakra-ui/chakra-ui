"use client"

import { Field, TagsInput } from "@chakra-ui/react"

export const TagsInputInvalid = () => (
  <Field.Root invalid>
    <TagsInput.Root defaultValue={["React", "Chakra"]}>
      <TagsInput.Label>Invalid Tags</TagsInput.Label>
      <TagsInput.Control>
        <TagsInput.Context>
          {({ value }) =>
            value.map((tag, index) => (
              <TagsInput.Item key={index} index={index} value={tag}>
                <TagsInput.ItemPreview>
                  <TagsInput.ItemText>{tag}</TagsInput.ItemText>
                  <TagsInput.ItemDeleteTrigger />
                </TagsInput.ItemPreview>
                <TagsInput.ItemInput />
              </TagsInput.Item>
            ))
          }
        </TagsInput.Context>

        <TagsInput.Input placeholder="Add tags..." />
      </TagsInput.Control>

      <TagsInput.HiddenInput />
    </TagsInput.Root>
    <Field.ErrorText>This is an error</Field.ErrorText>
  </Field.Root>
)
