"use client"

import { Button } from "@chakra-ui/react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Field } from "compositions/ui/field"
import { NumberInputField, NumberInputRoot } from "compositions/ui/number-input"
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
      <Field
        label="Number"
        invalid={!!errors.number}
        errorText={errors.number?.message}
      >
        <Controller
          name="number"
          control={control}
          render={({ field }) => (
            <NumberInputRoot
              disabled={field.disabled}
              name={field.name}
              value={field.value}
              onValueChange={({ value }) => {
                field.onChange(value)
              }}
            >
              <NumberInputField onBlur={field.onBlur} />
            </NumberInputRoot>
          )}
        />
      </Field>

      <Button size="sm" type="submit" mt="4">
        Submit
      </Button>
    </form>
  )
}
