"use client"

import { Button, Card, Input, Textarea } from "@chakra-ui/react"
import { Field } from "compositions/ui/field"
import {
  NativeSelectField,
  NativeSelectRoot,
} from "compositions/ui/native-select"
import { toaster } from "compositions/ui/toaster"
import { useEffect, useRef } from "react"
import { useFormState } from "react-dom"
import { submitEnterpriseForm } from "../actions"

export const useUpdateEffect: typeof useEffect = (effect, deps) => {
  const renderCycleRef = useRef(false)
  const effectCycleRef = useRef(false)

  useEffect(() => {
    const isMounted = renderCycleRef.current
    const shouldRun = isMounted && effectCycleRef.current
    if (shouldRun) {
      return effect()
    }
    effectCycleRef.current = true
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  useEffect(() => {
    renderCycleRef.current = true
    return () => {
      renderCycleRef.current = false
    }
  }, [])
}

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
      <Card.Body gap="4">
        <Field required label="What's your name?" asterisk>
          <Input placeholder="John Doe" name="name" required />
        </Field>

        <Field required label="What's your email?" asterisk>
          <Input
            placeholder="me@example.com"
            name="email"
            type="email"
            required
          />
        </Field>

        <Field required label="How can we help?" asterisk>
          <Textarea
            placeholder="Your company, your project, your needs..."
            name="message"
            required
          />
        </Field>

        <Field required label="Budget" asterisk>
          <NativeSelectRoot>
            <NativeSelectField
              placeholder="Select your budget"
              name="budget"
              items={[
                "$30,000 and under",
                "$30,000 - $50,000",
                "$50,000 - $100,000",
                "$100,000 and above",
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
