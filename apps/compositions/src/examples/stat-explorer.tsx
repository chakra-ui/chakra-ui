"use client"

import { HStack, Stack, Stat } from "@chakra-ui/react"

export const StatExplorer = () => {
  return (
    <Stack maxW="sm" gap="6" align="stretch">
      <Stat.Root borderRadius="md" width="full" p="4" borderWidth="1px">
        <Stat.Label fontSize="sm" color="gray.600" mb="1">
          Unique visitors
        </Stat.Label>

        <HStack gap="2">
          <Stat.ValueText
            as="span"
            fontSize="2xl"
            fontWeight="bold"
            lineHeight="1"
          >
            192.1
            <Stat.ValueUnit
              as="span"
              ml="1"
              fontSize="lg"
              color="gray.500"
              lineHeight="1"
            >
              k
            </Stat.ValueUnit>
          </Stat.ValueText>

          <Stat.UpIndicator
            as="span"
            color="green.500"
            fontSize="sm"
            lineHeight="1"
          >
            ▲ 12%
          </Stat.UpIndicator>
        </HStack>

        <Stat.HelpText fontSize="sm" color="gray.500" mt="2">
          Compared to last week
        </Stat.HelpText>
      </Stat.Root>

      <Stat.Root borderRadius="md" width="full" p="4" borderWidth="1px">
        <Stat.Label fontSize="sm" color="gray.600" mb="1">
          New signups
        </Stat.Label>

        <HStack gap="2">
          <Stat.ValueText
            as="span"
            fontSize="2xl"
            fontWeight="bold"
            lineHeight="1"
          >
            85
            <Stat.ValueUnit
              as="span"
              ml="1"
              fontSize="lg"
              color="gray.500"
              lineHeight="1"
            >
              users
            </Stat.ValueUnit>
          </Stat.ValueText>

          <Stat.DownIndicator
            as="span"
            color="red.500"
            fontSize="sm"
            lineHeight="1"
          >
            ▼ 8%
          </Stat.DownIndicator>
        </HStack>

        <Stat.HelpText fontSize="sm" color="gray.500" mt="2">
          Compared to last week
        </Stat.HelpText>
      </Stat.Root>
    </Stack>
  )
}
