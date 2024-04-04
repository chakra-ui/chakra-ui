import { Badge, Box, Center, chakra, HStack, List } from '@chakra-ui/react'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { Fragment, ReactElement, ReactNode, useRef } from 'react'
import { AiFillPlayCircle } from 'react-icons/ai'
import { BsFillGridFill } from 'react-icons/bs'
import { FaCompass, FaGlobe, FaPalette, FaTools } from 'react-icons/fa'
import { FiFigma } from 'react-icons/fi'
import { convertBackticksToInlineCode } from 'utils/convert-backticks-to-inline-code'
import { RouteItem, Routes } from 'utils/get-route-context'
import SidebarCategory from './sidebar-category'
import SidebarLink from './sidebar-link'

const sortRoutes = (routes: RouteItem[]) => {
  return routes.sort(({ title: titleA }, { title: titleB }) => {
    if (titleA < titleB) return -1
    if (titleA > titleB) return 1
    return 0
  })
}

export type SidebarContentProps = Routes & {
  pathname?: string
  contentRef?: any
}

function NewBadge() {
  return (
    <Badge
      ml='2'
      lineHeight='tall'
      fontSize='10px'
      variant='solid'
      colorPalette='purple'
    >
      New
    </Badge>
  )
}

export function SidebarContent({
  routes,
  pathname,
  contentRef,
}: SidebarContentProps) {
  return (
    <>
      {routes.map((lvl1, idx) => {
        return (
          <Fragment key={idx}>
            {lvl1.heading && (
              <chakra.h4
                fontSize='sm'
                fontWeight='bold'
                my='4'
                textTransform='uppercase'
                letterSpacing='wider'
              >
                {lvl1.title}
              </chakra.h4>
            )}

            {lvl1.routes.map((lvl2, index) => {
              if (!lvl2.routes) {
                return (
                  <SidebarLink
                    ml='-3'
                    mt='2'
                    key={lvl2.path}
                    href={lvl2.path}
                    external={lvl2.external}
                  >
                    {lvl2.title}
                  </SidebarLink>
                )
              }

              const selected = pathname.startsWith(lvl2.path)
              const opened = selected || lvl2.open

              const sortedRoutes = lvl2.sort
                ? sortRoutes(lvl2.routes)
                : lvl2.routes

              return (
                <SidebarCategory
                  contentRef={contentRef}
                  key={lvl2.path + index}
                  title={lvl2.title}
                  selected={selected}
                  opened={opened}
                >
                  {sortedRoutes.map((lvl3) => (
                    <SidebarLink key={lvl3.path} href={lvl3.path}>
                      <span>{convertBackticksToInlineCode(lvl3.title)}</span>
                      {lvl3.new && <NewBadge />}
                    </SidebarLink>
                  ))}
                </SidebarCategory>
              )
            })}
          </Fragment>
        )
      })}
    </>
  )
}

type MainNavLinkProps = {
  href: string
  icon: ReactElement
  children: ReactNode
  label?: string
  isActive?: boolean
  external?: boolean
}

const MainNavLink = (props: MainNavLinkProps) => {
  const { href, icon, children, isActive, external } = props
  const router = useRouter()
  const active = router.asPath.startsWith(href) || !!isActive

  return (
    <HStack
      asChild
      gap='3'
      fontSize='sm'
      fontWeight={active ? 'semibold' : 'medium'}
      color={active ? 'accent' : 'fg-muted'}
      _hover={{ color: active ? undefined : 'fg' }}
    >
      <NextLink target={external ? '_blank' : undefined} href={href}>
        <Center
          w='6'
          h='6'
          borderWidth='1px'
          bg={active ? 'teal.600' : 'transparent'}
          borderColor={active ? 'teal.600' : undefined}
          rounded='sm'
          color={active ? 'white' : 'fg.muted'}
        >
          {icon}
        </Center>
        <span>{children}</span>
      </NextLink>
    </HStack>
  )
}

export const mainNavLinks = [
  {
    icon: <FaCompass />,
    href: '/getting-started',
    label: 'Getting Started',
  },
  {
    icon: <FaPalette />,
    href: '/docs/styled-system/style-props',
    label: 'Styled System',
    match: (asPath: string, href: string) =>
      href.startsWith('/docs/styled-system') &&
      asPath.startsWith('/docs/styled-system'),
  },
  {
    icon: <BsFillGridFill />,
    href: '/docs/components',
    label: 'Components',
  },
  {
    icon: <FaTools />,
    href: '/docs/hooks/use-boolean',
    label: 'Hooks',
    match: (asPath: string, href: string) =>
      href.startsWith('/docs/hooks') && asPath.startsWith('/docs/hooks'),
  },
  {
    icon: <FiFigma />,
    href: '/figma/ui-kit',
    label: 'Figma',
    match: (asPath: string, href: string) =>
      href.startsWith('/figma') && asPath.startsWith('/figma'),
  },
  {
    icon: <FaGlobe />,
    href: '/community/team',
    label: 'Community',
    match: (asPath: string, href: string) =>
      href.startsWith('/community') && asPath.startsWith('/community'),
  },
  {
    icon: <AiFillPlayCircle />,
    href: 'https://play.chakra-ui.com',
    label: 'Playground',
    new: false,
    external: true,
  },
]

export const MainNavLinkGroup = (props: List.RootProps) => {
  const router = useRouter()

  return (
    <List.Root gap='4' styleType='none' {...props}>
      {mainNavLinks.map((item) => (
        <List.Item key={item.label}>
          <MainNavLink
            icon={item.icon}
            href={item.href}
            label={item.label}
            isActive={item.match?.(router.asPath, item.href)}
            external={item.external}
          >
            {item.label} {item.new && <NewBadge />}
          </MainNavLink>
        </List.Item>
      ))}
    </List.Root>
  )
}

const Sidebar = ({ routes }) => {
  const { pathname } = useRouter()
  const ref = useRef<HTMLDivElement>(null)

  return (
    <Box
      ref={ref}
      aria-label='Main Navigation'
      as='nav'
      pos='sticky'
      overscrollBehavior='contain'
      top='6.5rem'
      w='280px'
      h='calc(100vh - 8.125rem)'
      pr='8'
      pb='6'
      pl='6'
      pt='4'
      overflowY='auto'
      className='sidebar-content'
      flexShrink={0}
      display={{ base: 'none', md: 'block' }}
    >
      <MainNavLinkGroup mb='10' />
      <SidebarContent routes={routes} pathname={pathname} contentRef={ref} />
    </Box>
  )
}

export default Sidebar
