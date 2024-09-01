"use client"

import { Button, Input, Stack } from "@chakra-ui/react"
import { Field } from "compositions/ui/field"
import { PasswordInput } from "compositions/ui/password-input"
import { useForm } from "react-hook-form"

interface FormValues {
  username: string
  password: string
}

export const PasswordInputWithHookForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>()

  const onSubmit = handleSubmit((data) => console.log(data))

  return (
    <form onSubmit={onSubmit}>
      <Stack gap="4" align="flex-start" maxW="sm">
        <Field
          label="Username"
          invalid={!!errors.username}
          errorText={errors.username?.message}
        >
          <Input
            {...register("username", { required: "Username is required" })}
          />
        </Field>

        <Field
          label="Password"
          invalid={!!errors.password}
          errorText={errors.password?.message}
        >
          <PasswordInput
            {...register("password", { required: "Password is required" })}
          />
        </Field>

        <Button type="submit">Submit</Button>
      </Stack>
    </form>
  )
}
