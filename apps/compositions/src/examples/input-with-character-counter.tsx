"use client"

import { Input, InputGroup, Span } from "@chakra-ui/react"
import { useState } from "react"

const MAX_CHARACTERS = 20

export const InputWithCharacterCounter = () => {
  const [value, setValue] = useState("")
  return (
    <InputGroup
      endElement={
        <Span color="fg.muted" textStyle="xs">
          {value.length} / {MAX_CHARACTERS}
        </Span>
      }
    >
      <Input
        placeholder="Enter your message"
        value={value}
        maxLength={MAX_CHARACTERS}
        onChange={(e) => {
          setValue(e.currentTarget.value.slice(0, MAX_CHARACTERS))
        }}
      />
    </InputGroup>
  )
}
