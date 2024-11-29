"use client"

import { Button, CheckboxGroup, Code, Fieldset } from "@chakra-ui/react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Checkbox } from "compositions/ui/checkbox"
import { useController, useForm } from "react-hook-form"
import { z } from "zod"

const formSchema = z.object({
  framework: z.array(z.string()).min(1, {
    message: "You must select at least one framework.",
  }),
})

type FormData = z.infer<typeof formSchema>

const items = [
  { label: "React", value: "react" },
  { label: "Svelte", value: "svelte" },
  { label: "Vue", value: "vue" },
  { label: "Angular", value: "angular" },
]

export const CheckboxWithGroupHookForm = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  })

  const framework = useController({
    control,
    name: "framework",
    defaultValue: [],
  })

  const invalid = !!errors.framework

  return (
    <form onSubmit={handleSubmit((data) => console.log(data))}>
      <Fieldset.Root invalid={invalid}>
        <Fieldset.Legend>Select your framework</Fieldset.Legend>
        <CheckboxGroup
          invalid={invalid}
          value={framework.field.value}
          onValueChange={framework.field.onChange}
          name={framework.field.name}
        >
          <Fieldset.Content>
            {items.map((item) => (
              <Checkbox key={item.value} value={item.value}>
                {item.label}
              </Checkbox>
            ))}
          </Fieldset.Content>
        </CheckboxGroup>

        {errors.framework && (
          <Fieldset.ErrorText>{errors.framework.message}</Fieldset.ErrorText>
        )}

        <Button size="sm" type="submit" alignSelf="flex-start">
          Submit
        </Button>

        <Code>Values: {JSON.stringify(framework.field.value, null, 2)}</Code>
      </Fieldset.Root>
    </form>
  )
}
