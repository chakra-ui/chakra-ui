"use client"

import { Button, Field, NumberInput } from "@chakra-ui/react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { z } from "zod"

const formSchema = z.object({
  number: z.string({ message: "Number is required" }),
})

type FormValues = z.infer<typeof formSchema>

export const NumberInputWithHookForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  })

  const onSubmit = handleSubmit((data) => console.log(data))

  return (
    <form onSubmit={onSubmit}>
      <Field.Root invalid={!!errors.number}>
        <Field.Label>Number</Field.Label>
        <Controller
          name="number"
          control={control}
          render={({ field }) => (
            <NumberInput.Root
              disabled={field.disabled}
              name={field.name}
              value={field.value}
              onValueChange={({ value }) => {
                field.onChange(value)
              }}
            >
              <NumberInput.Control />
              <NumberInput.Input onBlur={field.onBlur} />
            </NumberInput.Root>
          )}
        />
        <Field.ErrorText>{errors.number?.message}</Field.ErrorText>
      </Field.Root>
      <Button size="sm" type="submit" mt="4">
        Submit
      </Button>
    </form>
  )
}
