"use client"

import { Button, Stack } from "@chakra-ui/react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Field } from "compositions/ui/field"
import { Slider } from "compositions/ui/slider"
import { Controller, useForm } from "react-hook-form"
import { z } from "zod"

const formSchema = z.object({
  value: z.array(
    z
      .number({ message: "Value is required" })
      .min(60, { message: "Value must be greater than 60" }),
  ),
})

type FormValues = z.infer<typeof formSchema>

export const SliderWithHookForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { value: [40] },
  })

  const onSubmit = handleSubmit((data) => console.log(data))

  return (
    <form onSubmit={onSubmit}>
      <Stack align="flex-start" gap="4" maxW="300px">
        <Controller
          name="value"
          control={control}
          render={({ field }) => (
            <Field
              label={`Slider: ${field.value[0]}`}
              invalid={!!errors.value?.length}
              errorText={errors.value?.[0]?.message}
            >
              <Slider
                width="full"
                onFocusChange={({ focusedIndex }) => {
                  if (focusedIndex !== -1) return
                  field.onBlur()
                }}
                name={field.name}
                value={field.value}
                onValueChange={({ value }) => {
                  field.onChange(value)
                }}
              />
            </Field>
          )}
        />

        <Button size="sm" type="submit">
          Submit
        </Button>
      </Stack>
    </form>
  )
}
