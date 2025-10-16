"use client"

import { Badge, Button, HStack, Span, TagsInput } from "@chakra-ui/react"

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const isValidEmail = (value: string) => EMAIL_REGEX.test(value)

export const TagsInputWithMax = () => {
  return (
    <TagsInput.Root
      max={3}
      validate={(e) => isValidEmail(e.inputValue)}
      defaultValue={["sage@company.com"]}
    >
      <TagsInput.Label>Invite guests (max 3)</TagsInput.Label>

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

        <TagsInput.Input placeholder="Add guests" />
      </TagsInput.Control>

      <TagsInput.Context>
        {({ value }) => (
          <HStack justify="space-between" hidden={value.length === 0} mt="2.5">
            <Span>
              You've invited <Badge>{value.length} / 3 guests</Badge> to your
              event
            </Span>
            <Button size="sm">Invite</Button>
          </HStack>
        )}
      </TagsInput.Context>
    </TagsInput.Root>
  )
}
