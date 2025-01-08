import { Flex, For } from "@chakra-ui/react"
import { QrCode } from "compositions/ui/qr-code"

export const QrCodeWithFill = () => {
  return (
    <Flex gap="4">
      <For each={["#5417D7", "#FF0000"]}>
        {(fill) => (
          <QrCode key={fill} fill={fill} value="https://www.google.com" />
        )}
      </For>
    </Flex>
  )
}
