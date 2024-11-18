"use client"

import { Button, HStack, Stack, parseColor } from "@chakra-ui/react"
import {
  ColorPickerArea,
  ColorPickerContent,
  ColorPickerControl,
  ColorPickerEyeDropper,
  ColorPickerInput,
  ColorPickerRoot,
  ColorPickerSliderControl,
  ColorPickerTrigger,
} from "compositions/ui/color-picker"
import { Field } from "compositions/ui/field"
import { Controller, useForm } from "react-hook-form"

interface FormValues {
  color: string
}

export const ColorPickerWithHookForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
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
            <Field
              label="Color"
              invalid={!!errors.color}
              errorText={errors.color?.message}
            >
              <ColorPickerRoot
                name={field.name}
                defaultValue={parseColor(field.value)}
                onValueChange={({ value }) => field.onChange(value)}
                maxW="200px"
              >
                <ColorPickerControl alignItems="center">
                  <ColorPickerInput />
                  <ColorPickerTrigger />
                </ColorPickerControl>
                <ColorPickerContent>
                  <ColorPickerArea />
                  <HStack>
                    <ColorPickerEyeDropper />
                    <ColorPickerSliderControl />
                  </HStack>
                </ColorPickerContent>
              </ColorPickerRoot>
            </Field>
          )}
        />

        <Button type="submit">Submit</Button>
      </Stack>
    </form>
  )
}
