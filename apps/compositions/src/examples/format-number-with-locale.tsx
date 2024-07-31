import { FormatNumber, HStack, LocaleProvider, Text } from "@chakra-ui/react"

export const FormatNumberWithLocale = () => {
  return (
    <Text textStyle="lg">
      <HStack>
        <Text fontWeight="medium">de-DE</Text>
        <LocaleProvider locale="de-DE">
          <FormatNumber value={1450.45} />
        </LocaleProvider>
      </HStack>

      <HStack>
        <Text fontWeight="medium">zh-CN</Text>
        <LocaleProvider locale="zh-CN">
          <FormatNumber value={1450.45} />
        </LocaleProvider>
      </HStack>
    </Text>
  )
}
