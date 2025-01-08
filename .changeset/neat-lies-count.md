---
"@chakra-ui/react": minor
---

Add new QRCode component for converting text and links to QR codes.

```tsx
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
```
