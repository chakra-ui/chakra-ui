import { HStack, LinkBox, LinkOverlay, Stack, Text } from '@chakra-ui/react'

export default function HackathonBanner() {
  return (
    <HStack
      w='full'
      justifyContent='center'
      mb={12}
      mt={{ base: -24, md: -12 }}
    >
      <LinkBox
        as='article'
        bg='teal.100'
        color='teal.700'
        px={4}
        py={1}
        rounded='md'
        transition='transform 150ms ease-out'
        _hover={{ transform: 'scale(1.05, 1.05)' }}
      >
        <Stack direction={{ base: 'column', md: 'row' }} gap={1}>
          <LinkOverlay href='https://hackathon.chakra-ui.com' external>
            <Text fontWeight='bold'>Ready, Set, Build! 🚀</Text>
          </LinkOverlay>
          <Text>Join the Chakra Hackathon!</Text>
        </Stack>
      </LinkBox>
    </HStack>
  )
}
