"use client"

import {
  Button,
  DatePicker,
  Field,
  Input,
  Portal,
  Stack,
} from "@chakra-ui/react"
import { standardSchemaResolver } from "@hookform/resolvers/standard-schema"
import { useForm } from "react-hook-form"
import { LuCalendar } from "react-icons/lu"
import { z } from "zod"

const formSchema = z.object({
  dob: z.string().min(1, { message: "Date of Birth is required" }),
  firstName: z.string().min(1, { message: "First name is required" }),
})

type FormValues = z.infer<typeof formSchema>

export const DatePickerForm = () => {
  const {
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
        <Field.Root invalid={!!errors.dob}>
          <Field.Label>Date of Birth</Field.Label>
          <DatePicker.Root>
            <DatePicker.Control>
              <DatePicker.Input
                placeholder="Select date"
                {...register("dob")}
              />
              <DatePicker.IndicatorGroup>
                <DatePicker.Trigger>
                  <LuCalendar />
                </DatePicker.Trigger>
              </DatePicker.IndicatorGroup>
            </DatePicker.Control>
            <Portal>
              <DatePicker.Positioner>
                <DatePicker.Content>
                  <DatePicker.Header />
                  <DatePicker.DayView />
                  <DatePicker.MonthView />
                  <DatePicker.YearView />
                </DatePicker.Content>
              </DatePicker.Positioner>
            </Portal>
          </DatePicker.Root>
          <Field.ErrorText>{errors.dob?.message}</Field.ErrorText>
        </Field.Root>

        <Button size="sm" type="submit" mt="4">
          Submit
        </Button>
      </Stack>
    </form>
  )
}
