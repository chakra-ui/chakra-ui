import {
  Box,
  BoxProps,
  Center,
  Flex,
  Grid,
  GridItem,
  HStack,
  IconButton,
  IconButtonProps,
  useBreakpointValue,
} from '@chakra-ui/react'
import { AnimatePresence, motion, useElementScroll } from 'framer-motion'
import useRouteChanged from 'hooks/use-route-changed'
import { getRoutes } from 'layouts/mdx'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { ReactNode, Ref, forwardRef, useEffect, useRef, useState } from 'react'
import { AiOutlineMenu } from 'react-icons/ai'
import { BsX } from 'react-icons/bs'
import { RemoveScroll } from 'react-remove-scroll'
import Logo from './logo'
import { SidebarContent, mainNavLinks } from './sidebar/sidebar'
import SponsorButton from './sponsor-button'
import { useUpdateEffect } from '@chakra-ui/hooks'

type NavLinkProps = {
  href: string
  children: ReactNode
}

function NavLink({ href, children }: NavLinkProps) {
  const router = useRouter()

  const isActive = router.asPath.startsWith(href)

  return (
    <GridItem asChild>
      <NextLink href={href}>
        <Center
          flex='1'
          minH='40px'
          as='button'
          rounded='md'
          transition='0.2s all'
          aria-current={isActive ? 'page' : undefined}
          fontWeight='medium'
          borderWidth={isActive ? undefined : '1px'}
          color={isActive ? 'white' : undefined}
          bg='bg.muted'
          _currentPage={{
            fontWeight: 'semibold',
            bg: { base: 'teal.800', _hover: 'teal.600' },
            color: 'white',
          }}
        >
          {children}
        </Center>
      </NextLink>
    </GridItem>
  )
}

interface MobileNavContentProps {
  open?: boolean
  onClose?: () => void
}

export function MobileNavContent(props: MobileNavContentProps) {
  const { open, onClose } = props
  const closeBtnRef = useRef<HTMLButtonElement>()
  const { pathname, asPath } = useRouter()

  useRouteChanged(onClose)

  /**
   * Scenario: Menu is open on mobile, and user resizes to desktop/tablet viewport.
   * Result: We'll close the menu
   */
  const showOnBreakpoint = useBreakpointValue({ base: true, lg: false })

  useEffect(() => {
    if (showOnBreakpoint == false) {
      onClose()
    }
  }, [showOnBreakpoint, onClose])

  useUpdateEffect(() => {
    if (open) {
      requestAnimationFrame(() => {
        closeBtnRef.current?.focus()
      })
    }
  }, [open])

  const [shadow, setShadow] = useState<string>()

  return (
    <AnimatePresence>
      {open && (
        <RemoveScroll forwardProps>
          <motion.div
            transition={{ duration: 0.08 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Flex
              direction='column'
              w='100%'
              bg='bg'
              h='100vh'
              overflow='auto'
              pos='absolute'
              top='0'
              left='0'
              zIndex={20}
              pb='8'
            >
              <Box>
                <Flex justify='space-between' px='6' pt='5' pb='4'>
                  <Logo css={{ rect: { fill: 'teal.300' } }} />
                  <HStack gap='5'>
                    <SponsorButton display='flex' />
                    <IconButton
                      aria-label='Close'
                      ref={closeBtnRef}
                      onClick={onClose}
                    >
                      <BsX />
                    </IconButton>
                  </HStack>
                </Flex>
                <Grid
                  px='6'
                  pb='6'
                  pt='2'
                  shadow={shadow}
                  templateColumns='repeat(2, 1fr)'
                  gap='2'
                >
                  {mainNavLinks.map((item) => (
                    <NavLink href={item.href} key={item.label}>
                      {item.label}
                    </NavLink>
                  ))}
                </Grid>
              </Box>

              <ScrollView
                onScroll={(scrolled) => {
                  setShadow(scrolled ? 'md' : undefined)
                }}
              >
                <SidebarContent
                  pathname={pathname}
                  routes={getRoutes(asPath)}
                />
              </ScrollView>
            </Flex>
          </motion.div>
        </RemoveScroll>
      )}
    </AnimatePresence>
  )
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ScrollView = (props: BoxProps & { onScroll?: any }) => {
  const { onScroll, ...rest } = props
  const [y, setY] = useState(0)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const elRef = useRef<any>()
  const { scrollY } = useElementScroll(elRef)
  useEffect(() => {
    return scrollY.onChange(() => setY(scrollY.get()))
  }, [scrollY])

  useUpdateEffect(() => {
    onScroll?.(y > 5 ? true : false)
  }, [y])

  return (
    <Box
      ref={elRef}
      flex='1'
      id='routes'
      overflow='auto'
      px='6'
      pb='6'
      {...rest}
    />
  )
}

export const MobileNavButton = forwardRef(
  (props: IconButtonProps, ref: Ref<HTMLButtonElement>) => {
    return (
      <IconButton
        ref={ref}
        display={{ base: 'flex', md: 'none' }}
        aria-label='Open menu'
        fontSize='20px'
        color='fg'
        variant='ghost'
        {...props}
      >
        <AiOutlineMenu />
      </IconButton>
    )
  },
)
