"use client"

import { Button, Input, Stack, Textarea } from "@chakra-ui/react"
import { Field } from "compositions/ui/field"
import { useForm } from "react-hook-form"

interface FormValues {
  username: string
  bio: string
}

export const TextareaWithHookForm = () => {
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
            placeholder="@username"
            {...register("username", { required: "Username is required" })}
          />
        </Field>
        <Field
          label="Profile bio"
          invalid={!!errors.bio}
          helperText="A short description of yourself"
          errorText={errors.bio?.message}
        >
          <Textarea
            placeholder="I am ..."
            {...register("bio", { required: "Bio is required" })}
          />
        </Field>
        <Button type="submit">Submit</Button>
      </Stack>
    </form>
  )
}
