import { Flex, LinkBox, LinkOverlay, Text } from '@chakra-ui/react'
import Image from 'next/image'
import Link from 'next/link'

interface Props {
  url: string
  title: string
  slug: string
}

export function ComponentOverviewItem(props: Props) {
  const { url, title, slug } = props
  const imageUrl = `/components/${slug}.svg`
  return (
    <LinkBox
      as='article'
      height='full'
      rounded='lg'
      overflow='hidden'
      transition='box-shadow 0.1s ease-out'
      role='group'
      borderWidth='1px'
      _dark={{ bg: 'whiteAlpha.50' }}
      _hover={{ shadow: 'md' }}
    >
      <Flex overflow='hidden' bg='gray.100'>
        <Image
          alt=''
          src={imageUrl}
          width={400}
          height={300}
          objectFit='cover'
        />
      </Flex>

      <LinkOverlay asChild>
        <Link href={url}>
          <Text fontSize='sm' fontWeight='semibold' px='4' py='3'>
            {title}
          </Text>
        </Link>
      </LinkOverlay>
    </LinkBox>
  )
}
