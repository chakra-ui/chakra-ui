"use client"

import { Button, HStack, Stack, parseColor } from "@chakra-ui/react"
import {
  ColorPickerArea,
  ColorPickerContent,
  ColorPickerControl,
  ColorPickerEyeDropper,
  ColorPickerInput,
  ColorPickerRoot,
  ColorPickerSliders,
  ColorPickerTrigger,
} from "compositions/ui/color-picker"
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
            <ColorPickerRoot
              name={field.name}
              defaultValue={parseColor(field.value)}
              onValueChange={(e) => field.onChange(e.valueAsString)}
            >
              <ColorPickerControl>
                <ColorPickerInput />
                <ColorPickerTrigger />
              </ColorPickerControl>
              <ColorPickerContent>
                <ColorPickerArea />
                <HStack>
                  <ColorPickerEyeDropper />
                  <ColorPickerSliders />
                </HStack>
              </ColorPickerContent>
            </ColorPickerRoot>
          )}
        />

        <Button type="submit">Submit</Button>
      </Stack>
    </form>
  )
}
