"use client"

import { Button, Field, Stack, Switch } from "@chakra-ui/react"
import { zodResolver } from "@hookform/resolvers/zod"
import "compositions/ui/switch"
import { Controller, useForm } from "react-hook-form"
import { z } from "zod"

const formSchema = z.object({
  active: z.boolean({ message: "Active is required" }),
})

type FormData = z.infer<typeof formSchema>

export const SwitchWithHookForm = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  })

  return (
    <form onSubmit={handleSubmit((data) => console.log(data))}>
      <Stack align="flex-start">
        <Controller
          name="active"
          control={control}
          render={({ field }) => (
            <Field.Root invalid={!!errors.active}>
              <Switch.Root
                name={field.name}
                checked={field.value}
                onCheckedChange={({ checked }) => field.onChange(checked)}
              >
                <Switch.HiddenInput onBlur={field.onBlur} />
                <Switch.Control>
                  <Switch.Thumb />
                </Switch.Control>
                <Switch.Label>Activate Chakra</Switch.Label>
              </Switch.Root>
              <Field.ErrorText>{errors.active?.message}</Field.ErrorText>
            </Field.Root>
          )}
        />
        <Button size="sm" type="submit" mt="4">
          Submit
        </Button>
      </Stack>
    </form>
  )
}
