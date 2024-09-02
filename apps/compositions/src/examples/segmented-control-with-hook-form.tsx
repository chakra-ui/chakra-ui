"use client"

import { Button, Stack } from "@chakra-ui/react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Field } from "compositions/ui/field"
import { SegmentedControl } from "compositions/ui/segmented-control"
import { Controller, useForm } from "react-hook-form"
import { z } from "zod"

const formSchema = z.object({
  fontSize: z.string({ message: "Font size is required" }),
})

type FormValues = z.infer<typeof formSchema>

export const SegmentedControlWithHookForm = () => {
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<FormValues>({
    defaultValues: { fontSize: "md" },
    resolver: zodResolver(formSchema),
  })

  const onSubmit = handleSubmit((data) => console.log(data))

  return (
    <form onSubmit={onSubmit}>
      <Stack gap="4" align="flex-start">
        <Controller
          control={control}
          name="fontSize"
          render={({ field }) => (
            <Field
              label="Font size"
              invalid={!!errors.fontSize}
              errorText={errors.fontSize?.message}
            >
              <SegmentedControl
                onBlur={field.onBlur}
                name={field.name}
                value={field.value}
                items={["sm", "md", "lg"]}
                onValueChange={({ value }) => field.onChange(value)}
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
