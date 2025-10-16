"use client"

import { TagsInput } from "@chakra-ui/react"

export const TagsInputWithColors = () => (
  <TagsInput.Root defaultValue={["React", "Chakra", "TypeScript"]}>
    <TagsInput.Label>Colored Tags</TagsInput.Label>
    <TagsInput.Control>
      <TagsInput.Context>
        {({ value }) =>
          value.map((tag, index) => (
            <TagsInput.Item key={index} index={index} value={tag}>
              <TagsInput.ItemPreview
                style={{ backgroundColor: randomColor(tag) }}
                _highlighted={{ filter: "brightness(0.9)" }}
              >
                <TagsInput.ItemText>{tag}</TagsInput.ItemText>
                <TagsInput.ItemDeleteTrigger />
              </TagsInput.ItemPreview>
              <TagsInput.ItemInput />
            </TagsInput.Item>
          ))
        }
      </TagsInput.Context>

      <TagsInput.Input placeholder="Add tag..." />
      <TagsInput.ClearTrigger />
    </TagsInput.Control>

    <TagsInput.HiddenInput />
  </TagsInput.Root>
)

const randomColor = (str: string) => {
  // Simple hash from string
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash)
  }

  // Generate light HSL color (H: 0-359, S: 60-80%, L: 85-94%)
  const h = Math.abs(hash) % 360
  const s = 60 + (Math.abs(hash) % 20) // 60% - 79%
  const l = 85 + (Math.abs(hash) % 10) // 85% - 94%

  return `hsl(${h},${s}%,${l}%)`
}
