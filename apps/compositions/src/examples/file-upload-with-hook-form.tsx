"use client"

import { Button } from "@chakra-ui/react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Field } from "compositions/ui/field"
import {
  FileUploadList,
  FileUploadRoot,
  FileUploadTrigger,
} from "compositions/ui/file-upload"
import { Controller, useForm } from "react-hook-form"
import { HiUpload } from "react-icons/hi"
import { z } from "zod"

const formSchema = z.object({
  images: z.array(z.instanceof(File)).min(1, "At least one image is required"),
})

type FormValues = z.infer<typeof formSchema>

export const FileUploadWithHookForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      images: [],
    },
  })

  const onSubmit = handleSubmit((data) => console.log(data))

  return (
    <form onSubmit={onSubmit}>
      <Controller
        control={control}
        name="images"
        render={({ field }) => (
          <Field
            label="Images"
            invalid={!!errors.images}
            errorText={errors.images?.message}
          >
            <FileUploadRoot
              name={field.name}
              onFileChange={(e) => {
                field.onChange(e.acceptedFiles)
              }}
            >
              <FileUploadTrigger asChild onBlur={() => field.onBlur()}>
                <Button variant="outline" size="sm">
                  <HiUpload /> Upload file
                </Button>
              </FileUploadTrigger>

              <FileUploadList showSize />
            </FileUploadRoot>
          </Field>
        )}
      />

      <Button type="submit" size="sm" mt="4">
        Submit
      </Button>
    </form>
  )
}
