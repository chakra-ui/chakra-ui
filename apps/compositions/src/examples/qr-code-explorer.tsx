"use client"

import { Button, QrCode, Stack } from "@chakra-ui/react"

export const QrCodeExplorer = () => {
  return (
    <Stack gap="6" maxW="sm" align="center">
      <QrCode.Root value="https://www.google.com">
        <QrCode.Frame>
          <QrCode.Pattern />
        </QrCode.Frame>

        <QrCode.DownloadTrigger
          mt={4}
          asChild
          mimeType="image/png"
          fileName="qr-code.png"
        >
          <Button size="sm" variant="outline">
            Download QR
          </Button>
        </QrCode.DownloadTrigger>
      </QrCode.Root>
    </Stack>
  )
}
