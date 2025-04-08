import { Flex, For, QrCode } from "@chakra-ui/react"

export const QrCodeWithFill = () => {
  return (
    <Flex gap="4">
      <For each={["#5417D7", "#FF0000"]}>
        {(fill) => (
          <QrCode.Root key={fill} value="https://www.google.com">
            <QrCode.Frame style={{ fill }}>
              <QrCode.Pattern />
            </QrCode.Frame>
          </QrCode.Root>
        )}
      </For>
    </Flex>
  )
}
