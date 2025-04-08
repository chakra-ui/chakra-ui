"use client"

import { Button, Checkbox, Field, Input, Stack } from "@chakra-ui/react"

export const CheckboxWithForm = () => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        console.log(e.currentTarget.elements)
      }}
    >
      <Stack maxW="sm" gap="4" align="flex-start">
        <Field.Root>
          <Field.Label>Username</Field.Label>
          <Input placeholder="username" />
        </Field.Root>
        <Field.Root>
          <Field.Label>Password</Field.Label>
          <Input placeholder="password" />
        </Field.Root>

        <Checkbox.Root mt="2" value="remember me">
          <Checkbox.HiddenInput />
          <Checkbox.Control />
          <Checkbox.Label>Remember me</Checkbox.Label>
        </Checkbox.Root>

        <Button variant="solid" mt="3">
          Submit
        </Button>
      </Stack>
    </form>
  )
}
