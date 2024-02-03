import { Center, Flex, Text, chakra } from '@chakra-ui/react'
import { getUrl } from './get-url'
import { t } from 'utils/i18n'

export const AdBanner = () => {
  return (
    <Center
      py='2'
      px='3'
      bgGradient='linear(to-r,cyan.700, purple.500)'
      color='white'
      textAlign='center'
    >
      <Flex align='center' fontSize='sm'>
        <Text fontWeight='medium' maxW={{ base: '32ch', md: 'unset' }}>
          {t('component.chakra-pro.ad-banner.message')}
        </Text>
        <chakra.a
          flexShrink={0}
          href={getUrl('ad-banner')}
          ms='6'
          bg='blackAlpha.300'
          color='whiteAlpha.900'
          fontWeight='semibold'
          px='3'
          py='1'
          rounded='base'
        >
          {t('component.chakra-pro.ad-banner.learn-more')}{' '}
        </chakra.a>
      </Flex>
    </Center>
  )
}
