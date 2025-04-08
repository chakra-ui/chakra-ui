"use client"

import { QrCode, SegmentGroup, Stack } from "@chakra-ui/react"
import { useState } from "react"

type ErrorLevel = "L" | "M" | "Q" | "H"

export const QrCodeWithErrorLevel = () => {
  const [errorLevel, setErrorLevel] = useState<ErrorLevel>("L")
  return (
    <Stack align="flex-start">
      <QrCode.Root
        value="https://www.google.com"
        size="xl"
        encoding={{ ecc: errorLevel }}
      >
        <QrCode.Frame />
      </QrCode.Root>
      <SegmentGroup.Root
        size="sm"
        defaultValue={"L"}
        onValueChange={(e) => setErrorLevel(e.value as ErrorLevel)}
      >
        <SegmentGroup.Indicator />
        <SegmentGroup.Items items={["L", "M", "Q", "H"]} />
      </SegmentGroup.Root>
    </Stack>
  )
}
