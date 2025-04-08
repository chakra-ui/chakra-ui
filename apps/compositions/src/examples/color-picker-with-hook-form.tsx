"use client"

import {
  Button,
  ColorPicker,
  HStack,
  Portal,
  Stack,
  parseColor,
} from "@chakra-ui/react"
import { Controller, useForm } from "react-hook-form"

interface FormValues {
  color: string
}

export const ColorPickerWithHookForm = () => {
  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: { color: "#000000" },
  })

  const onSubmit = handleSubmit((data) => console.log(data))

  return (
    <form onSubmit={onSubmit}>
      <Stack gap="4" align="flex-start" maxW="sm">
        <Controller
          name="color"
          control={control}
          render={({ field }) => (
            <ColorPicker.Root
              name={field.name}
              defaultValue={parseColor(field.value)}
              onValueChange={(e) => field.onChange(e.valueAsString)}
            >
              <ColorPicker.HiddenInput />
              <ColorPicker.Control>
                <ColorPicker.Input />
                <ColorPicker.Trigger />
              </ColorPicker.Control>
              <Portal>
                <ColorPicker.Positioner>
                  <ColorPicker.Content>
                    <ColorPicker.Area />
                    <HStack>
                      <ColorPicker.EyeDropper size="sm" variant="outline" />
                      <ColorPicker.Sliders />
                    </HStack>
                  </ColorPicker.Content>
                </ColorPicker.Positioner>
              </Portal>
            </ColorPicker.Root>
          )}
        />

        <Button type="submit">Submit</Button>
      </Stack>
    </form>
  )
}
