"use client"

import { CloseButton, Input, InputGroup } from "@chakra-ui/react"
import { useRef, useState } from "react"

export const InputWithClearButton = () => {
  const [value, setValue] = useState("Initial value")
  const inputRef = useRef<HTMLInputElement | null>(null)

  const endElement = value ? (
    <CloseButton
      size="xs"
      onClick={() => {
        setValue("")
        inputRef.current?.focus()
      }}
      me="-2"
    />
  ) : undefined

  return (
    <InputGroup endElement={endElement}>
      <Input
        ref={inputRef}
        placeholder="Email"
        value={value}
        onChange={(e) => {
          setValue(e.currentTarget.value)
        }}
      />
    </InputGroup>
  )
}
