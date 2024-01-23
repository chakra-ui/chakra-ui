import {
  AspectRatio,
  LinkBox,
  LinkOverlay,
  Text,
  VStack,
} from '@chakra-ui/react'
import { ChakraNextUnwrappedImage } from 'components/chakra-next-image'

export const ShowcaseItem = ({ name, image, url }) => {
  return (
    <VStack key={url} alignItems='flex-start' spacing={3}>
      <LinkBox
        w='full'
        borderWidth='1px'
        transform='auto'
        _dark={{ bg: 'whiteAlpha.50' }}
        _hover={{ boxShadow: 'md', translateY: '-2px' }}
        rounded='md'
        overflow='hidden'
        transition='all 0.1s ease-out'
      >
        <AspectRatio ratio={16 / 9} w='full'>
          <ChakraNextUnwrappedImage
            alt={name}
            layout='fill'
            objectFit='cover'
            src={
              image
                ? /^(https|http)/.test(image)
                  ? image
                  : `/${image}`
                : '/og-image.png'
            }
          />
        </AspectRatio>
        <LinkOverlay href={url} isExternal>
          <Text
            px={4}
            py={3}
            fontWeight='semibold'
            textAlign='start'
            fontSize={{ base: 'sm', md: 'md' }}
          >
            {name}
          </Text>
        </LinkOverlay>
      </LinkBox>
    </VStack>
  )
}
