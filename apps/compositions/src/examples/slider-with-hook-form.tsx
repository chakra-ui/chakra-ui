"use client"

import { Button, Field, Slider, Stack } from "@chakra-ui/react"
import { standardSchemaResolver } from "@hookform/resolvers/standard-schema"
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
    resolver: standardSchemaResolver(formSchema),
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
            <Field.Root invalid={!!errors.value?.length}>
              <Field.Label>Slider: {field.value[0]}</Field.Label>
              <Slider.Root
                width="full"
                name={field.name}
                value={field.value}
                onValueChange={({ value }) => {
                  field.onChange(value)
                }}
                onFocusChange={({ focusedIndex }) => {
                  if (focusedIndex !== -1) return
                  field.onBlur()
                }}
              >
                <Slider.Control>
                  <Slider.Track>
                    <Slider.Range />
                  </Slider.Track>
                  <Slider.Thumbs />
                </Slider.Control>
              </Slider.Root>
              <Field.ErrorText>{errors.value?.[0]?.message}</Field.ErrorText>
            </Field.Root>
          )}
        />

        <Button size="sm" type="submit">
          Submit
        </Button>
      </Stack>
    </form>
  )
}
