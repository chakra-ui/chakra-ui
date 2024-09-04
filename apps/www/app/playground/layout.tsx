import { HeaderSection } from "@/components/site/header.section"
import { Stack } from "@chakra-ui/react"

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <Stack pos="relative" gap="8" overflow="hidden">
      <HeaderSection />
      {children}
    </Stack>
  )
}
