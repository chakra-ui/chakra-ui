import { Box, Link as ChakraLink, SimpleGrid, Text } from '@chakra-ui/react'
import Link from 'next/link'
import {
  BlitzSvg,
  GatsbySvg,
  MeteorSvg,
  NextjsSvg,
  RedwoodSvg,
  RemixSvg,
  ViteSvg,
} from './framework-svg'

type FrameworkLinkProps = {
  accentColor: string
  href: string
  name: string
  children: React.ReactNode
}

const FrameworkLink = (props: FrameworkLinkProps) => {
  const { accentColor, href, children, name } = props
  return (
    <ChakraLink
      asChild
      bg='white'
      display='block'
      shadow='md'
      textDecoration='none'
      borderRadius='xl'
      overflow='hidden'
      transform='auto'
      transition='all 0.1s ease-in-out'
      _hover={{ textDecoration: 'none', translateY: '-2px', shadow: 'md' }}
    >
      <Box pt='4' asChild>
        <Link href={href}>
          {children}
          <Box bg={accentColor} mt='4' py='1' color='white'>
            <Text textAlign='center' fontSize='sm' fontWeight='bold'>
              {name}
            </Text>
          </Box>
        </Link>
      </Box>
    </ChakraLink>
  )
}

export const FrameworkLinks = () => {
  return (
    <SimpleGrid mt='12' minChildWidth='160px' gap='40px' fontSize='6xl'>
      <FrameworkLink
        href='/getting-started/nextjs-app-guide'
        accentColor='black'
        name='Next.js (App)'
      >
        <NextjsSvg style={{ margin: 'auto' }} />
      </FrameworkLink>

      <FrameworkLink
        href='/getting-started/nextjs-pages-guide'
        accentColor='black'
        name='Next.js (Pages)'
      >
        <NextjsSvg style={{ margin: 'auto' }} />
      </FrameworkLink>

      <FrameworkLink
        href='/getting-started/gatsby-guide'
        accentColor='#663399'
        name='Gatsby'
      >
        <GatsbySvg style={{ margin: 'auto' }} />
      </FrameworkLink>

      <FrameworkLink
        href='/getting-started/blitzjs-guide'
        accentColor='#6700EB'
        name='Blitz.js'
      >
        <BlitzSvg style={{ margin: 'auto' }} />
      </FrameworkLink>

      <FrameworkLink
        href='/getting-started/redwoodjs-guide'
        accentColor='#BF4722'
        name='RedwoodJS'
      >
        <RedwoodSvg style={{ margin: 'auto' }} />
      </FrameworkLink>

      <FrameworkLink
        href='/getting-started/remix-guide'
        accentColor='#121212'
        name='Remix'
      >
        <RemixSvg style={{ margin: 'auto' }} />
      </FrameworkLink>

      <FrameworkLink
        href='/getting-started/vite-guide'
        accentColor='#C07600'
        name='Vite'
      >
        <ViteSvg style={{ margin: 'auto' }} />
      </FrameworkLink>

      <FrameworkLink
        href='/getting-started/meteor-guide'
        accentColor='#FF6A3E'
        name='Meteor'
      >
        <MeteorSvg style={{ margin: 'auto' }} />
      </FrameworkLink>
    </SimpleGrid>
  )
}
