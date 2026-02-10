"use client"

import {
  Button,
  DatePicker,
  Field,
  Input,
  Portal,
  Stack,
  parseDate,
} from "@chakra-ui/react"
import { standardSchemaResolver } from "@hookform/resolvers/standard-schema"
import { Controller, useForm } from "react-hook-form"
import { LuCalendar } from "react-icons/lu"
import { z } from "zod"

const formSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  dob: z.string().min(1, { message: "Date of birth is required" }),
})

type FormValues = z.infer<typeof formSchema>

export const DatePickerWithHookForm = () => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: standardSchemaResolver(formSchema),
  })

  const onSubmit = handleSubmit((data) => alert(JSON.stringify(data)))

  return (
    <form onSubmit={onSubmit}>
      <Stack gap="4" align="flex-start" maxW="sm">
        <Field.Root invalid={!!errors.firstName}>
          <Field.Label>First name</Field.Label>
          <Input {...register("firstName")} />
          <Field.ErrorText>{errors.firstName?.message}</Field.ErrorText>
        </Field.Root>

        <Controller
          control={control}
          name="dob"
          render={({ field }) => (
            <Field.Root invalid={!!errors.dob}>
              <DatePicker.Root
                value={field.value ? [parseDate(field.value)] : []}
                onValueChange={(e) =>
                  field.onChange(e.value[0]?.toString() ?? "")
                }
              >
                <DatePicker.Label>Date of birth</DatePicker.Label>
                <DatePicker.Control>
                  <DatePicker.Input placeholder="Select date" />
                  <DatePicker.IndicatorGroup>
                    <DatePicker.Trigger>
                      <LuCalendar />
                    </DatePicker.Trigger>
                  </DatePicker.IndicatorGroup>
                </DatePicker.Control>
                <Portal>
                  <DatePicker.Positioner>
                    <DatePicker.Content>
                      <DatePicker.View view="day">
                        <DatePicker.Header />
                        <DatePicker.DayTable />
                      </DatePicker.View>
                      <DatePicker.View view="month">
                        <DatePicker.Header />
                        <DatePicker.MonthTable />
                      </DatePicker.View>
                      <DatePicker.View view="year">
                        <DatePicker.Header />
                        <DatePicker.YearTable />
                      </DatePicker.View>
                    </DatePicker.Content>
                  </DatePicker.Positioner>
                </Portal>
              </DatePicker.Root>
              <Field.ErrorText>{errors.dob?.message}</Field.ErrorText>
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
