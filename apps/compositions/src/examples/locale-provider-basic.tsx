import { Heading, LocaleProvider, Slider, Stack, Text } from "@chakra-ui/react"

export const LocaleProviderBasic = () => {
  return (
    <LocaleProvider locale="ar-AE">
      <Stack gap="4" maxW="sm" dir="rtl">
        <Heading>مرحباً بكم في تشاكرا يو آي</Heading>
        <Text textStyle="body-sm">
          هذا مثال على كيفية استخدام موفر اللغة في تطبيقك. يمكنك تغيير اللغة
          بسهولة.
        </Text>
        <Slider.Root defaultValue={[50]}>
          <Slider.Control>
            <Slider.Track>
              <Slider.Range />
            </Slider.Track>
            <Slider.Thumbs />
          </Slider.Control>
        </Slider.Root>
      </Stack>
    </LocaleProvider>
  )
}
