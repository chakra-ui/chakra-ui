import { Badge, Box, Flex, HStack, Heading, Span, Text } from '@chakra-ui/react'
import Container from 'components/container'
import Image from 'next/image'
import { FiArrowRight } from 'react-icons/fi'
import { getUrl } from './get-url'

export const ChakraProAd = () => (
  <Box as='section' bg='gray.900' color='white' overflow='hidden'>
    <Container pt='24' pb='0'>
      <Flex align='center' direction='column' textAlign='center' mb='10'>
        <Text casing='uppercase' letterSpacing='wide' fontWeight='bold'>
          Premium components{' '}
          <Badge
            colorPalette='yellow'
            variant='solid'
            color='gray.800'
            mt='-1'
            ml='2'
          >
            New
          </Badge>
        </Text>
        <Heading
          mt='4'
          fontWeight='extrabold'
          size='3xl'
          maxW='14ch'
          mx='auto'
          letterSpacing='tighter'
        >
          <Span bgGradient='linear(to-r, blue.400, teal.400)' bgClip='text'>
            Build faster
          </Span>{' '}
          with Chakra UI Pro 💎
        </Heading>
        <Text maxW='48ch' mx='auto' fontSize='lg' mt='6' opacity={0.8}>
          Beautiful and responsive React components to build your application or
          marketing pages quicker.
        </Text>
        <HStack
          mt='6'
          asChild
          bg='whiteAlpha.300'
          rounded='md'
          px='8'
          py='3'
          color='white'
          fontSize='lg'
          fontWeight='semibold'
          transition='all 0.2s'
          _hover={{ bg: 'whiteAlpha.400' }}
        >
          <a href={getUrl('homepage-ad')}>
            <Text>Learn more</Text>
            <Box as={FiArrowRight} display='inline-block' ml='2' />
          </a>
        </HStack>
      </Flex>
      <Box position='relative' top='3'>
        <Image
          src='/chakra-ui-ad.png'
          alt='Chakra UI Pro Image'
          layout='responsive'
          width='1200'
          height='320'
        />
      </Box>
    </Container>
  </Box>
)
