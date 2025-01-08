"use client"

import { Input, Stack } from "@chakra-ui/react"
import { QrCode } from "compositions/ui/qr-code"
import { useState } from "react"

export const QrCodeWithInput = () => {
  const [value, setValue] = useState("https://www.google.com")
  return (
    <Stack maxW="240px" gap="4">
      <QrCode value={value} />
      <Input value={value} onChange={(e) => setValue(e.target.value)} />
    </Stack>
  )
}
