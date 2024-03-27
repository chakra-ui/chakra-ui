import { Box, Text, HStack, SimpleGrid } from '@chakra-ui/react'
import * as React from 'react'
import DiscordIcon from './docs/discord-logo'
import { FaTwitter } from 'react-icons/fa'

function CommunityCardItem({ children, accentColor, icon, href }) {
  return (
    <HStack
      as='a'
      href={href}
      justify='center'
      spacing='5'
      borderWidth='1px'
      py='3'
      px='4'
      rounded='lg'
    >
      <Box as='span' fontSize='xl' color={accentColor}>
        {icon}
      </Box>
      <Text fontWeight='semibold'>{children}</Text>
    </HStack>
  )
}

export function JoinCommunityCards() {
  return (
    <SimpleGrid mt='8' columns={{ base: 1, md: 2 }} spacing='4'>
      <CommunityCardItem
        accentColor='#5865F2'
        icon={<DiscordIcon />}
        href='https://chakra-ui.com/discord'
      >
        Join the Discord
      </CommunityCardItem>
      <CommunityCardItem
        accentColor='blue.300'
        icon={<FaTwitter />}
        href='https://twitter.com/chakra_ui'
      >
        Follow us on Twitter
      </CommunityCardItem>
    </SimpleGrid>
  )
}
