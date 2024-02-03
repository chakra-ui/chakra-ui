import { Box, Flex } from '@chakra-ui/react'
import NextImage from 'next/image'
import * as React from 'react'
import { t } from 'utils/i18n'
import { getUrl } from './get-url'

const DocsPageChakraProAd = () => (
  <Flex
    p='4'
    bg='gray.50'
    _dark={{ bg: 'rgba(36, 70, 93, 0.32)' }}
    as='a'
    href={getUrl('docs-ad')}
    rel='noopener sponsored'
    target='_blank'
    maxW='xl'
    my='8'
    rounded='md'
  >
    <Box w='xs' h='100px' bg='gray.300' mr='4'>
      <NextImage
        alt='chakra ui pro'
        src='/chakra-pro-ad.png'
        layout='fixed'
        width='150'
        height='100'
      />
    </Box>
    <Flex direction='column'>
      <Box flex='1' fontSize='sm'>
        <b>{t('component.chakra-pro.docs-page-ad.message-bold')}</b>{' '}
        {t('component.chakra-pro.docs-page-ad.message')}
      </Box>
      <Box fontWeight='medium' fontSize='xs' opacity={0.7}>
        {t('component.chakra-pro.docs-page-ad.ads-via-chakra-ui')}
      </Box>
    </Flex>
  </Flex>
)

export default DocsPageChakraProAd
