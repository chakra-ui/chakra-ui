"use client"

import { TagsInput } from "@chakra-ui/react"

export const TagsInputWithColors = () => (
  <TagsInput.Root defaultValue={["React", "Chakra", "TypeScript"]}>
    <TagsInput.Label>Colored Tags</TagsInput.Label>
    <TagsInput.Control>
      <TagsInput.Context>
        {({ value }) =>
          value.map((tag, index) => {
            const backgroundColor =
              index % 3 === 0
                ? "#4FD1C5"
                : index % 3 === 1
                  ? "#63B3ED"
                  : "#F6AD55"
            const textColor = "#fff"

            return (
              <TagsInput.Item key={index} index={index} value={tag}>
                <TagsInput.ItemPreview
                  style={{
                    backgroundColor,
                    color: textColor,
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    padding: "0.25rem 0.5rem",
                    borderRadius: "0.375rem",
                  }}
                >
                  <TagsInput.ItemText>{tag}</TagsInput.ItemText>
                  <TagsInput.ItemDeleteTrigger style={{ color: textColor }} />
                </TagsInput.ItemPreview>
                <TagsInput.ItemInput />
              </TagsInput.Item>
            )
          })
        }
      </TagsInput.Context>

      <TagsInput.Input placeholder="Add tag..." />
      <TagsInput.ClearTrigger />
    </TagsInput.Control>

    <TagsInput.HiddenInput />
  </TagsInput.Root>
)
