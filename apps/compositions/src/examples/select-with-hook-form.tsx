"use client"

import { Button, Field, Stack, createListCollection } from "@chakra-ui/react"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "compositions/ui/select"
import { Controller, useForm } from "react-hook-form"
import { z } from "zod"

const formSchema = z.object({
  framework: z.string({ message: "Framework is required" }).array(),
})

type FormValues = z.infer<typeof formSchema>

export const SelectWithHookForm = () => {
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
        <Field.Root invalid={!!errors.framework} width="320px">
          <Field.Label>Select framework</Field.Label>
          <Controller
            control={control}
            name="framework"
            render={({ field }) => (
              <SelectRoot
                name={field.name}
                value={field.value}
                onValueChange={({ value }) => field.onChange(value)}
                onInteractOutside={() => field.onBlur()}
                collection={frameworks}
              >
                <SelectTrigger>
                  <SelectValueText placeholder="Select framework" />
                </SelectTrigger>
                <SelectContent>
                  {frameworks.items.map((item) => (
                    <SelectItem item={item} key={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </SelectRoot>
            )}
          />
          <Field.ErrorText>{errors.framework?.message}</Field.ErrorText>
        </Field.Root>

        <Button size="sm" type="submit">
          Submit
        </Button>
      </Stack>
    </form>
  )
}

const frameworks = createListCollection({
  items: [
    { label: "React.js", value: "react" },
    { label: "Vue.js", value: "vue" },
    { label: "Angular", value: "angular" },
    { label: "Svelte", value: "svelte" },
  ],
})
