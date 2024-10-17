"use client"

import { useUpdateEffect } from "@/lib/use-update-effect"
import { Button, Card, Input, Textarea } from "@chakra-ui/react"
import { Field } from "compositions/ui/field"
import {
  NativeSelectField,
  NativeSelectRoot,
} from "compositions/ui/native-select"
import { toaster } from "compositions/ui/toaster"
import { useRef } from "react"
import { useFormState } from "react-dom"
import { submitEnterpriseForm } from "../actions"

export const EnterpriseForm = () => {
  const [state, formAction] = useFormState(submitEnterpriseForm, {
    success: false,
    message: "",
  })

  const formRef = useRef<HTMLFormElement>(null)

  useUpdateEffect(() => {
    if (state.success) {
      toaster.success({ title: state.message })
      formRef.current?.reset()
    } else {
      toaster.error({ title: state.message })
    }
  }, [state])

  return (
    <form ref={formRef} action={formAction}>
      <Card.Body gap="4" alignItems="flex-start">
        <Field required label="What's your name?">
          <Input placeholder="John Doe" name="name" required />
        </Field>

        <Field required label="What's your email?">
          <Input
            placeholder="me@example.com"
            name="email"
            type="email"
            required
          />
        </Field>

        <Field required label="How can we help?">
          <Textarea
            placeholder="Your company, your project, your needs..."
            name="message"
            required
          />
        </Field>

        <Field required label="Budget">
          <NativeSelectRoot>
            <NativeSelectField
              placeholder="Select your budget"
              name="budget"
              items={[
                "$10,000 and under",
                "$10,000 - $30,000",
                "$30,000 - $50,000",
                "$50,000 and above",
              ]}
            />
          </NativeSelectRoot>
        </Field>

        <Button type="submit" colorPalette="teal" mt="4">
          Hire the team
        </Button>
      </Card.Body>
    </form>
  )
}
