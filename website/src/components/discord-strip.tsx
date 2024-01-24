import { Box, BoxProps, Flex, Heading, Text, chakra } from '@chakra-ui/react'
import * as React from 'react'
import Container from './container'
import DiscordIcon from './docs/discord-logo'
import { t } from 'utils/i18n'

export function DiscordStrip(props: BoxProps) {
  return (
    <Box bg='#5865F2' {...props}>
      <Container py='8'>
        <Flex
          direction={{ base: 'column', md: 'row' }}
          align='center'
          justify='space-between'
        >
          <Flex color='white'>
            <Flex
              alignItems='center'
              justifyContent='center'
              fontSize='48px'
              mr='5'
            >
              <DiscordIcon />
            </Flex>
            <Box>
              <Heading size='md' lineHeight='1.2' mb='1'>
                {t('component.discord-strip.heading')}
              </Heading>
              <Text opacity={0.7}>
                {t('component.discord-strip.description')}
              </Text>
            </Box>
          </Flex>
          <chakra.button
            width={{ base: '100%', md: 'auto' }}
            mt={{ base: '6', md: 0 }}
            color='gray.800'
            as='a'
            justifyContent='center'
            display='inline-flex'
            alignItems='center'
            href='https://discord.gg/chakra-ui'
            rel='noopener'
            target='_blank'
            fontWeight='bold'
            shadow='md'
            bg='white'
            px='24px'
            h='56px'
            rounded='lg'
            fontSize='md'
          >
            {t('component.discord-strip.join-the-chakra-discord')}
          </chakra.button>
        </Flex>
      </Container>
    </Box>
  )
}
