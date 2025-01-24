"use client"

import { Button, Input, Stack } from "@chakra-ui/react"
import { Checkbox } from "compositions/ui/checkbox"
import { Field } from "compositions/ui/field"

export const CheckboxWithForm = () => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        console.log(e.currentTarget.elements)
      }}
    >
      <Stack maxW="sm" gap="4" align="flex-start">
        <Field label="User name">
          <Input name="username" />
        </Field>
        <Field label="Password">
          <Input name="password" />
        </Field>

        <Checkbox mt="2" name="remember" value="one">
          Remember me
        </Checkbox>

        <Button variant="solid" mt="3">
          Submit
        </Button>
      </Stack>
    </form>
  )
}
