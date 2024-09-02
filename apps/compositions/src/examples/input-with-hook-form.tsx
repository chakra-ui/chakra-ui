"use client"

import { Button, Input, Stack } from "@chakra-ui/react"
import { Field } from "compositions/ui/field"
import { useForm } from "react-hook-form"

interface FormValues {
  firstName: string
  lastName: string
}

export const InputWithHookForm = () => {
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
          label="First name"
          invalid={!!errors.firstName}
          errorText={errors.firstName?.message}
        >
          <Input
            {...register("firstName", { required: "First name is required" })}
          />
        </Field>
        <Field
          label="Last name"
          invalid={!!errors.lastName}
          errorText={errors.lastName?.message}
        >
          <Input
            {...register("lastName", { required: "Last name is required" })}
          />
        </Field>
        <Button type="submit">Submit</Button>
      </Stack>
    </form>
  )
}
