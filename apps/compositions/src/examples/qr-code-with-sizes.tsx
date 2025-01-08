import { For, Stack } from "@chakra-ui/react"
import { QrCode } from "compositions/ui/qr-code"

export const QrCodeWithSizes = () => {
  return (
    <Stack>
      <For each={["2xs", "xs", "sm", "md", "lg", "xl", "2xl"]}>
        {(size) => (
          <QrCode size={size} value="https://www.google.com" key={size} />
        )}
      </For>
    </Stack>
  )
}
