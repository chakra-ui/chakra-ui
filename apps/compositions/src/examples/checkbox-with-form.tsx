"use client"

import { Input, Stack } from "@chakra-ui/react"
import { Button } from "compositions/ui/button"
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
      <Stack maxW="sm" gap="4">
        <Field label="User name">
          <Input name="username" />
        </Field>
        <Field label="Password">
          <Input name="password" />
        </Field>

        <Checkbox name="remember" value="one" alignSelf="flex-start">
          Remember me
        </Checkbox>

        <Button alignSelf="flex-start" variant="solid" mt="3">
          Submit
        </Button>
      </Stack>
    </form>
  )
}
