import { Box, BoxProps, Text } from '@chakra-ui/react'

export default function TocNav({ children, title, ...rest }: BoxProps) {
  return (
    <Box
      as='nav'
      aria-labelledby='toc-title'
      width='16rem'
      flexShrink={0}
      display={{ base: 'none', xl: 'block' }}
      position='sticky'
      py='10'
      pr='4'
      top='6rem'
      right='0'
      fontSize='sm'
      alignSelf='start'
      maxHeight='calc(100vh - 8rem)'
      overflowY='auto'
      css={{ overscrollBehavior: 'contain' }}
      {...rest}
    >
      {title && (
        <Text
          as='h2'
          id='toc-title'
          textTransform='uppercase'
          fontWeight='bold'
          fontSize='xs'
          color='gray.700'
          _dark={{ color: 'gray.400' }}
          letterSpacing='wide'
        >
          {title}
        </Text>
      )}
      {children}
    </Box>
  )
}
