"use client"

import { Button, Field, SegmentGroup, Stack } from "@chakra-ui/react"
import { zodResolver } from "@hookform/resolvers/zod"
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
            <Field.Root invalid={!!errors.fontSize}>
              <Field.Label>Font size</Field.Label>
              <SegmentGroup.Root
                size="sm"
                onBlur={field.onBlur}
                name={field.name}
                value={field.value}
                onValueChange={({ value }) => field.onChange(value)}
              >
                <SegmentGroup.Items items={["sm", "md", "lg"]} />
                <SegmentGroup.Indicator />
              </SegmentGroup.Root>
              <Field.ErrorText>{errors.fontSize?.message}</Field.ErrorText>
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
