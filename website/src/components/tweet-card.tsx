import { Box, Span, chakra } from '@chakra-ui/react'
import Image from 'next/image'

interface TweetCardProps {
  name: string
  image: string
  handle: string
  date: string
  url: string
  content: string
}

function TweetCard(props: TweetCardProps) {
  const { name, handle, content, url } = props
  const image = `/avatars/${handle}.jpg`
  return (
    <chakra.a
      href={url}
      target='_blank'
      rel='noopener'
      display='flex'
      rounded='lg'
      p='5'
      mb='4'
      bg='white'
      _dark={{ bg: 'gray.700' }}
      shadow='xs'
    >
      <Span
        display='inline-flex'
        alignItems='center'
        flexShrink={0}
        mr='16px'
        width={8}
        height={8}
        position='relative'
      >
        <Image alt={name} fill src={image} loading='lazy' />
      </Span>

      <Box fontSize='sm'>
        <p>
          {name} <Span opacity={0.7}>{handle}</Span>
        </p>
        <Box
          as='p'
          mt='2'
          dangerouslySetInnerHTML={{
            __html: content.replace(/--/g, '<br /><br />'),
          }}
        />
      </Box>
    </chakra.a>
  )
}

export default TweetCard
