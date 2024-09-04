"use client"

import { Button } from "@chakra-ui/react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Field } from "compositions/ui/field"
import {
  NativeSelectField,
  NativeSelectRoot,
} from "compositions/ui/native-select"
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
      <Field
        label="Framework"
        invalid={!!errors.framework}
        errorText={errors.framework?.message}
      >
        <NativeSelectRoot size="sm" width="240px">
          <NativeSelectField
            {...register("framework")}
            placeholder="Select framework"
            items={["React", "Vue", "Angular", "Svelte"]}
          />
        </NativeSelectRoot>
      </Field>

      <Button size="sm" type="submit" mt="4">
        Submit
      </Button>
    </form>
  )
}
