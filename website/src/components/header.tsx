import { useDisclosure, useUpdateEffect } from '@chakra-ui/hooks'
import {
  Box,
  ClientOnly,
  Flex,
  HStack,
  HTMLChakraProps,
  Icon,
  IconButton,
  Link,
  Square,
  chakra,
} from '@chakra-ui/react'
import siteConfig from 'configs/site-config.json'
import { useScroll } from 'framer-motion'
import { useTheme } from 'next-themes'
import NextLink from 'next/link'
import { useEffect, useRef, useState } from 'react'
import {
  BsDiscord,
  BsGithub,
  BsMoonFill,
  BsSunFill,
  BsYoutube,
} from 'react-icons/bs'
import Logo, { LogoIcon } from './logo'
import { MobileNavButton, MobileNavContent } from './mobile-nav'
import Search from './omni-search'
import SponsorButton from './sponsor-button'
import VersionSwitcher from './version-switcher'

function ColorModeIcon() {
  const { theme } = useTheme()
  const SwitchIcon = theme === 'light' ? BsMoonFill : BsSunFill
  return (
    <ClientOnly fallback={<Square size='1em' />}>
      <SwitchIcon />
    </ClientOnly>
  )
}

function HeaderContent() {
  const mobileNav = useDisclosure()
  const mobileNavBtnRef = useRef<HTMLButtonElement>()

  const { setTheme, theme } = useTheme()

  useUpdateEffect(() => {
    mobileNavBtnRef.current?.focus()
  }, [mobileNav.open])

  return (
    <>
      <Flex w='100%' h='100%' px='6' align='center' justify='space-between'>
        <Flex align='center'>
          <chakra.a
            asChild
            display='block'
            aria-label='Chakra UI, Back to homepage'
          >
            <NextLink href='/'>
              <Logo display={{ base: 'none', md: 'block' }} />
              <Box minW='3rem' display={{ base: 'block', md: 'none' }}>
                <LogoIcon />
              </Box>
            </NextLink>
          </chakra.a>
        </Flex>

        <Flex
          justify='flex-end'
          w='100%'
          align='center'
          color='gray.400'
          maxW='1100px'
        >
          <Search />
          <VersionSwitcher
            width='auto'
            flexShrink={0}
            display={{ base: 'none', md: 'flex' }}
            marginRight='5'
          />
          <HStack gap='5' display={{ base: 'none', md: 'flex' }}>
            <Link
              external
              aria-label='Go to Chakra UI GitHub page'
              href={siteConfig.repo.url}
            >
              <Icon
                as={BsGithub}
                display='block'
                transition='color 0.2s'
                fontSize='md'
                _hover={{ color: 'gray.600' }}
              />
            </Link>
            <Link
              external
              aria-label='Go to Chakra UI Discord page'
              href='/discord'
            >
              <Icon
                as={BsDiscord}
                display='block'
                transition='color 0.2s'
                fontSize='md'
                _hover={{ color: 'gray.600' }}
              />
            </Link>
            <Link
              external
              aria-label='Go to Chakra UI YouTube channel'
              href={siteConfig.youtube}
            >
              <Icon
                as={BsYoutube}
                display='block'
                transition='color 0.2s'
                fontSize='md'
                _hover={{ color: 'gray.600' }}
              />
            </Link>
          </HStack>
          <HStack gap='5'>
            <IconButton
              size='md'
              aria-label='toggle color mode'
              variant='ghost'
              color='current'
              ml={{ base: '0', md: '3' }}
              onClick={() => {
                setTheme(theme === 'light' ? 'dark' : 'light')
              }}
            >
              <ColorModeIcon />
            </IconButton>
            <SponsorButton ml='5' />
            <MobileNavButton
              ref={mobileNavBtnRef}
              aria-label='Open Menu'
              onClick={mobileNav.onOpen}
            />
          </HStack>
        </Flex>
      </Flex>
      <MobileNavContent open={mobileNav.open} onClose={mobileNav.onClose} />
    </>
  )
}

function Header(props: HTMLChakraProps<'header'>) {
  const { maxW = '8xl', maxWidth = '8xl' } = props
  const ref = useRef<HTMLHeadingElement>()
  const [y, setY] = useState(0)
  const { height = 0 } = ref.current?.getBoundingClientRect() ?? {}

  const { scrollY } = useScroll()
  useEffect(() => {
    return scrollY.onChange(() => setY(scrollY.get()))
  }, [scrollY])

  return (
    <chakra.header
      ref={ref}
      shadow={y > height ? 'sm' : undefined}
      transition='box-shadow 0.2s, background-color 0.2s'
      pos='sticky'
      top='0'
      zIndex='11'
      bg='bg'
      left='0'
      right='0'
      width='full'
      {...props}
    >
      <chakra.div height='4.5rem' mx='auto' maxW={maxW} maxWidth={maxWidth}>
        <HeaderContent />
      </chakra.div>
    </chakra.header>
  )
}

export default Header
