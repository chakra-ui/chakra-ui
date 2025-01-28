"use client"

import { Input, QrCode, Stack } from "@chakra-ui/react"
import { useState } from "react"

export const QrCodeWithInput = () => {
  const [value, setValue] = useState("https://www.google.com")
  return (
    <Stack maxW="240px" gap="4">
      <QrCode.Root value={value}>
        <QrCode.Frame>
          <QrCode.Pattern />
        </QrCode.Frame>
      </QrCode.Root>
      <Input value={value} onChange={(e) => setValue(e.target.value)} />
    </Stack>
  )
}
