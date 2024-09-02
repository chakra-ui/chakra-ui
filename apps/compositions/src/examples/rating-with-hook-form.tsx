"use client"

import { Button, Stack } from "@chakra-ui/react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Field } from "compositions/ui/field"
import { Rating } from "compositions/ui/rating"
import { Controller, useForm } from "react-hook-form"
import { z } from "zod"

const formSchema = z.object({
  rating: z.number({ required_error: "Rating is required" }).min(1).max(5),
})

type FormValues = z.infer<typeof formSchema>

export const RatingWithHookForm = () => {
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  })

  const onSubmit = handleSubmit((data) => console.log(data))

  return (
    <form onSubmit={onSubmit}>
      <Stack gap="4" align="flex-start">
        <Field
          label="Rating"
          invalid={!!errors.rating}
          errorText={errors.rating?.message}
        >
          <Controller
            control={control}
            name="rating"
            render={({ field }) => (
              <Rating
                name={field.name}
                value={field.value}
                onValueChange={({ value }) => field.onChange(value)}
              />
            )}
          />
        </Field>
        <Button size="sm" type="submit">
          Submit
        </Button>
      </Stack>
    </form>
  )
}
