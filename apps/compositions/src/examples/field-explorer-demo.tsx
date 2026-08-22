"use client"

import { Button, Field, Input, Textarea, VStack } from "@chakra-ui/react"

export const FieldExplorerDemo = () => {
  return (
    <VStack p="6" maxW="500px" mx="auto" gap="6" align="stretch">
      <Field.Root required invalid>
        <Field.Label>
          Email Address
          <Field.RequiredIndicator />
        </Field.Label>

        <Input placeholder="you@example.com" />

        <Field.HelperText>
          Enter your email. We’ll never share it.
        </Field.HelperText>

        <Field.ErrorText>Please enter a valid email</Field.ErrorText>
      </Field.Root>

      <Field.Root>
        <Field.Label>Message</Field.Label>
        <Textarea placeholder="Your message..." minH="100px" />
        <Field.HelperText>Optional: You can leave this empty</Field.HelperText>
      </Field.Root>

      <Button colorScheme="blue">Submit</Button>
    </VStack>
  )
}
