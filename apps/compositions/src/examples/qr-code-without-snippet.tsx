import { QrCode } from "@chakra-ui/react"

export const QrCodeWithoutSnippet = () => {
  return (
    <QrCode.Root value="..." size="md">
      <QrCode.Frame>
        <QrCode.Pattern />
      </QrCode.Frame>
    </QrCode.Root>
  )
}
