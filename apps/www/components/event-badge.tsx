import { HStack, Highlight, Stack, Text } from "@chakra-ui/react"
import { LuCalendar } from "react-icons/lu"
import { LogoIcon } from "./logo"

export const EventBadge = () => {
  return (
    <HStack
      asChild
      mt="2"
      bg="teal.subtle/60"
      p="4"
      borderRadius="lg"
      boxShadow="md"
    >
      <a href="https://lu.ma/g5bfaob2">
        <Stack>
          <HStack textStyle="sm" fontWeight="semibold" color="teal.fg">
            <LogoIcon height="4" />
            London Meetup 🇬🇧
          </HStack>
          <Text fontWeight="medium" lineHeight="1.3">
            <Highlight query="Meet-up" styles={{ px: "0.5", bg: "teal.muted" }}>
              Come network with the Chakra Community ⚡️
            </Highlight>
          </Text>
          <HStack textStyle="sm" fontWeight="medium" color="teal.fg">
            <LuCalendar />
            Thursday, Nov. 28th
          </HStack>
        </Stack>
      </a>
    </HStack>
  )
}
