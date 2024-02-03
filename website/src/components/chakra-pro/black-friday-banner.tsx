import { Button, Center, DarkMode, Link, Stack, Text } from '@chakra-ui/react'
import { getUrl } from './get-url'

export const BlackFridayBanner = () => (
  <Center px='6' py='3' bg='gray.800' _dark={{ bg: 'black' }} color='white'>
    <DarkMode>
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
          spacing={{ base: '0', md: '1' }}
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
          as={Link}
          isExternal
          href={getUrl('ad-banner')}
          colorScheme='yellow'
          size='sm'
          alignSelf={{ base: 'stretch', sm: 'center' }}
          _hover={{ textDecoration: 'none' }}
        >
          Get it now
        </Button>
      </Stack>
    </DarkMode>
  </Center>
)
