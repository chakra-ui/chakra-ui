"use client"

import { Stack } from "@chakra-ui/react"
import { QrCode } from "compositions/ui/qr-code"
import { SegmentedControl } from "compositions/ui/segmented-control"
import { useState } from "react"

type ErrorLevel = "L" | "M" | "Q" | "H"

export const QrCodeWithErrorLevel = () => {
  const [errorLevel, setErrorLevel] = useState<ErrorLevel>("L")
  return (
    <Stack align="flex-start">
      <QrCode
        size="xl"
        value="https://www.google.com"
        encoding={{ ecc: errorLevel }}
      />
      <SegmentedControl
        size="sm"
        defaultValue={"L"}
        items={["L", "M", "Q", "H"]}
        onValueChange={(e) => setErrorLevel(e.value as ErrorLevel)}
      />
    </Stack>
  )
}
