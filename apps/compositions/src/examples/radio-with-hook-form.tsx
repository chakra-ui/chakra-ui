"use client"

import { Button, Fieldset, HStack } from "@chakra-ui/react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Radio, RadioGroup } from "compositions/ui/radio"
import { Controller, useForm } from "react-hook-form"
import { z } from "zod"

const items = [
  { value: "1", label: "Option 1" },
  { value: "2", label: "Option 2" },
  { value: "3", label: "Option 3" },
]

const formSchema = z.object({
  value: z.string({ message: "Value is required" }),
})

type FormValues = z.infer<typeof formSchema>

export const RadioWithHookForm = () => {
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
      <Fieldset.Root invalid={!!errors.value}>
        <Fieldset.Legend>Select value</Fieldset.Legend>
        <Controller
          name="value"
          control={control}
          render={({ field }) => (
            <RadioGroup
              name={field.name}
              value={field.value}
              onValueChange={({ value }) => {
                field.onChange(value)
              }}
            >
              <HStack gap="6">
                {items.map((item) => (
                  <Radio
                    key={item.value}
                    value={item.value}
                    inputProps={{ onBlur: field.onBlur }}
                  >
                    {item.label}
                  </Radio>
                ))}
              </HStack>
            </RadioGroup>
          )}
        />

        {errors.value && (
          <Fieldset.ErrorText>{errors.value?.message}</Fieldset.ErrorText>
        )}

        <Button size="sm" type="submit" alignSelf="flex-start">
          Submit
        </Button>
      </Fieldset.Root>
    </form>
  )
}
