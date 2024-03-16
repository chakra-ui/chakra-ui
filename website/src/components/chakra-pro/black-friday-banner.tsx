import { Button, Center, Stack, Text } from '@chakra-ui/react'
import { getUrl } from './get-url'

export const BlackFridayBanner = () => (
  <Center
    className='dark'
    px='6'
    py='3'
    bg='gray.800'
    _dark={{ bg: 'black' }}
    color='white'
  >
    <Stack
      align={{ base: 'start', sm: 'center' }}
      justify='space-between'
      fontSize='sm'
      flex='1'
      maxW='3xl'
      direction={{ base: 'column', sm: 'row' }}
    >
      <Stack
        direction={{ base: 'column', md: 'row' }}
        gap={{ base: '0', md: '1' }}
      >
        <Text fontWeight='semibold'>Black Friday Sale:</Text>
        <Text>
          Get Premium Chakra UI Components at{' '}
          <Text as='span' color='yellow.200' fontWeight='semibold'>
            40% OFF
          </Text>
        </Text>
      </Stack>

      <Button
        asChild
        colorPalette='yellow'
        size='sm'
        alignSelf={{ base: 'stretch', sm: 'center' }}
        _hover={{ textDecoration: 'none' }}
      >
        <a href={getUrl('ad-banner')}>Get it now</a>
      </Button>
    </Stack>
  </Center>
)
