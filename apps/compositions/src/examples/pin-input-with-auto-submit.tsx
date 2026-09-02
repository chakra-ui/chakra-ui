"use client"

import { PinInput, Stack, Text } from "@chakra-ui/react"
import { useState } from "react"

export const PinInputWithAutoSubmit = () => {
  const [submitted, setSubmitted] = useState(false)

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault()
        setSubmitted(true)
      }}
    >
      <Stack gap="3">
        <PinInput.Root autoSubmit onValueChange={() => setSubmitted(false)}>
          <PinInput.HiddenInput name="pin" />
          <PinInput.Control>
            <PinInput.Input index={0} />
            <PinInput.Input index={1} />
            <PinInput.Input index={2} />
            <PinInput.Input index={3} />
          </PinInput.Control>
        </PinInput.Root>
        <Text textStyle="sm" color={submitted ? "fg.success" : "fg.muted"}>
          {submitted
            ? "The form was submitted."
            : "The form submits when all digits are entered."}
        </Text>
      </Stack>
    </form>
  )
}
