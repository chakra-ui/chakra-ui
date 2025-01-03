import { Heading, LocaleProvider, Stack, Text } from "@chakra-ui/react"
import { Slider } from "compositions/ui/slider"

export const LocaleProviderBasic = () => {
  return (
    <LocaleProvider locale="ar-AE">
      <Stack gap="4" maxW="sm" dir="rtl">
        <Heading>مرحباً بكم في تشاكرا يو آي</Heading>
        <Text textStyle="body-sm">
          هذا مثال على كيفية استخدام موفر اللغة في تطبيقك. يمكنك تغيير اللغة
          بسهولة.
        </Text>
        <Slider defaultValue={[50]} />
      </Stack>
    </LocaleProvider>
  )
}
