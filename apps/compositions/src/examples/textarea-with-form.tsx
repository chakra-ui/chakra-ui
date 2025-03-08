"use client"

import { Button, Field, Stack, Textarea } from "@chakra-ui/react"

export const TextareaWithForm = () => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        console.log("submitted")
      }}
    >
      <Stack maxW="sm" gap="4">
        <Field.Root>
          <Field.Label>Issue Details</Field.Label>
          <Textarea placeholder="Type your message here..." />
          <Field.HelperText>
            You can @mention people and refer to issues and pull requests.
          </Field.HelperText>
        </Field.Root>
        <Button alignSelf="flex-start" variant="solid" mt="3">
          Submit
        </Button>
      </Stack>
    </form>
  )
}
