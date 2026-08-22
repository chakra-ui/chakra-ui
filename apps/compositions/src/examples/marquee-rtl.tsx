"use client"

import { Box, Circle, HStack, LocaleProvider, Marquee } from "@chakra-ui/react"

export const MarqueeRtl = () => (
  <LocaleProvider locale="ar-AE">
    <Marquee.Root>
      <Marquee.Viewport>
        <Marquee.Content>
          {items.map((item, i) => (
            <Marquee.Item key={i} ps="8">
              <HStack gap="8" textStyle="xl" fontWeight="medium">
                <Box>{item}</Box>
                <Circle size="1.5" bg="fg.muted" />
              </HStack>
            </Marquee.Item>
          ))}
        </Marquee.Content>
      </Marquee.Viewport>
    </Marquee.Root>
  </LocaleProvider>
)

const items = [
  "مرحبا بكم",
  "تصميم جميل",
  "سهل الاستخدام",
  "مكونات قابلة للوصول",
  "أداء عالي",
  "تجربة مستخدم رائعة",
]
