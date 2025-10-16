"use client"

import { TagsInput } from "@chakra-ui/react"
import { useState } from "react"

export const TagsInputControlled = () => {
  const [tags, setTags] = useState<string[]>(["React", "Chakra"])

  return (
    <TagsInput.Root
      value={tags}
      onValueChange={(details) => setTags(details.value)}
    >
      <TagsInput.Label>Tags</TagsInput.Label>
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
        <TagsInput.Input placeholder="Add tag..." />
      </TagsInput.Control>
    </TagsInput.Root>
  )
}
