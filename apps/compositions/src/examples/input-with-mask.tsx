"use client"

import { Input } from "@sh3yk0-ui/react"
import { withMask } from "use-mask-input"

export const InputWithMask = () => {
  return (
    <Input placeholder="(99) 99999-9999" ref={withMask("(99) 99999-9999")} />
  )
}
