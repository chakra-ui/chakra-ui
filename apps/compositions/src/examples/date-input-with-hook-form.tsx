"use client"

import { Button, DateInput, Field, Input, Stack } from "@chakra-ui/react"
import { standardSchemaResolver } from "@hookform/resolvers/standard-schema"
import { Controller, useForm } from "react-hook-form"
import { z } from "zod"

const formSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  dob: z.array(z.any()).min(1, { message: "Date of birth is required" }),
})

type FormValues = z.infer<typeof formSchema>

export const DateInputWithHookForm = () => {
  const { handleSubmit, control, formState } = useForm<FormValues>({
    resolver: standardSchemaResolver(formSchema),
    defaultValues: { dob: [] },
  })

  const onSubmit = handleSubmit((data) => console.log(data))

  return (
    <form onSubmit={onSubmit}>
      <Stack gap="4" align="flex-start" maxW="14rem">
        <Field.Root invalid={!!formState.errors.name}>
          <Field.Label>Name</Field.Label>
          <Input placeholder="Enter your name" />
          <Field.ErrorText>{formState.errors.name?.message}</Field.ErrorText>
        </Field.Root>
        <Field.Root invalid={!!formState.errors.dob}>
          <Controller
            control={control}
            name="dob"
            render={({ field }) => (
              <DateInput.Root
                value={field.value}
                onValueChange={(e) => field.onChange(e.value)}
                invalid={!!formState.errors.dob}
              >
                <DateInput.Label>Date of birth</DateInput.Label>
                <DateInput.Control>
                  <DateInput.Segments />
                </DateInput.Control>
                <DateInput.HiddenInput />
              </DateInput.Root>
            )}
          />
          <Field.ErrorText>{formState.errors.dob?.message}</Field.ErrorText>
        </Field.Root>
        <Button type="submit">Submit</Button>
      </Stack>
    </form>
  )
}
