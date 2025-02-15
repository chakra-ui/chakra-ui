"use client"

import { Button, Field, NativeSelect } from "@chakra-ui/react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

const formSchema = z.object({
  framework: z.string().min(1, { message: "Framework is required" }),
})

type FormValues = z.infer<typeof formSchema>

export const NativeSelectWithHookForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  })

  const onSubmit = handleSubmit((data) => console.log(data))

  return (
    <form onSubmit={onSubmit}>
      <Field.Root invalid={!!errors.framework}>
        <Field.Label>Framework</Field.Label>
        <NativeSelect.Root size="sm" width="240px">
          <NativeSelect.Field
            placeholder="Select option"
            {...register("framework")}
          >
            <option value="react">React</option>
            <option value="vue">Vue</option>
            <option value="angular">Angular</option>
            <option value="svelte">Svelte</option>
          </NativeSelect.Field>
          <NativeSelect.Indicator />
        </NativeSelect.Root>
        <Field.ErrorText>{errors.framework?.message}</Field.ErrorText>
      </Field.Root>

      <Button size="sm" type="submit" mt="4">
        Submit
      </Button>
    </form>
  )
}
