"use client"

import { Button, Code, HStack, Stack } from "@chakra-ui/react"
import { Radio, RadioGroup } from "compositions/ui/radio"
import { Controller, useForm } from "react-hook-form"

export const RadioWithForm = () => {
  const { control, handleSubmit, watch } = useForm<{ framework: string }>()
  const value = watch("framework")

  return (
    <form onSubmit={handleSubmit((data) => console.log(data))}>
      <Stack align="flex-start" gap="4">
        <Code fontWeight="semibold">Selected: {value}</Code>
        <Controller
          control={control}
          name="framework"
          render={({ field: { onChange, value } }) => (
            <RadioGroup value={value} onValueChange={(e) => onChange(e.value)}>
              <HStack gap="6">
                <Radio value="react">React</Radio>
                <Radio value="vue">Vue</Radio>
                <Radio value="svelte">Svelte</Radio>
              </HStack>
            </RadioGroup>
          )}
        />

        <Button type="submit" size="sm" variant="outline">
          Submit
        </Button>
      </Stack>
    </form>
  )
}
