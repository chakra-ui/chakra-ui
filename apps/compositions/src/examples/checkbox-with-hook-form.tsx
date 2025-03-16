"use client"

import { Button, Checkbox, Code, Field, HStack, Stack } from "@chakra-ui/react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useController, useForm } from "react-hook-form"
import { z } from "zod"

const formSchema = z.object({
  enabled: z.boolean(),
})

type FormData = z.infer<typeof formSchema>

export const CheckboxWithHookForm = () => {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: { enabled: false },
  })

  const enabled = useController({
    control: form.control,
    name: "enabled",
  })

  const invalid = !!form.formState.errors.enabled

  return (
    <form onSubmit={form.handleSubmit((data) => console.log(data))}>
      <Stack align="flex-start">
        <Controller
          control={form.control}
          name="enabled"
          render={({ field }) => (
            <Field.Root invalid={invalid} disabled={field.disabled}>
              <Checkbox.Root
                checked={field.value}
                onCheckedChange={({ checked }) => field.onChange(checked)}
              >
                <Checkbox.HiddenInput />
                <Checkbox.Control />
                <Checkbox.Label>Checkbox</Checkbox.Label>
              </Checkbox.Root>
              <Field.ErrorText>
                {form.formState.errors.enabled?.message}
              </Field.ErrorText>
            </Field.Root>
          )}
        />

        <HStack>
          <Button
            size="xs"
            variant="outline"
            onClick={() => form.setValue("enabled", !enabled.field.value)}
          >
            Toggle
          </Button>
          <Button size="xs" variant="outline" onClick={() => form.reset()}>
            Reset
          </Button>
        </HStack>

        <Button size="sm" type="submit" alignSelf="flex-start">
          Submit
        </Button>

        <Code>Checked: {JSON.stringify(enabled.field.value, null, 2)}</Code>
      </Stack>
    </form>
  )
}
