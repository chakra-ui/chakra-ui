"use client"

import { QrCode, Stack } from "@chakra-ui/react"
import { SegmentedControl } from "compositions/ui/segmented-control"
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
        <QrCode.Frame>
          <QrCode.Pattern />
        </QrCode.Frame>
      </QrCode.Root>
      <SegmentedControl
        size="sm"
        defaultValue={"L"}
        items={["L", "M", "Q", "H"]}
        onValueChange={(e) => setErrorLevel(e.value as ErrorLevel)}
      />
    </Stack>
  )
}
