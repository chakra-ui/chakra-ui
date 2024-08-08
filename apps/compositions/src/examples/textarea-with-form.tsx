"use client"

import { Stack, Textarea } from "@chakra-ui/react"
import { Button } from "compositions/ui/button"
import { Field } from "compositions/ui/field"

export const TextareaWithForm = () => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        console.log("submitted")
      }}
    >
      <Stack maxW="sm" gap="4">
        <Field
          label="Issue Details"
          hint="You can @mention people and refer to issues and pull requests."
        >
          <Textarea placeholder="Type your message here..." />
        </Field>
        <Button alignSelf="flex-start" variant="solid" mt="3">
          Submit
        </Button>
      </Stack>
    </form>
  )
}
