import { chakra, Flex, FlexProps, HTMLChakraProps } from '@chakra-ui/react'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { forwardRef, Ref, useEffect, useRef } from 'react'

const StyledLink = forwardRef(function StyledLink(
  props: HTMLChakraProps<'a'> & {
    isActive?: boolean
    external?: boolean
  },
  ref: Ref<any>,
) {
  const { isActive, external = false, ...rest } = props

  return (
    <chakra.a
      target={external ? '_blank' : undefined}
      aria-current={isActive ? 'page' : undefined}
      width='100%'
      px='3'
      py='1'
      rounded='md'
      ref={ref}
      fontSize='sm'
      fontWeight='500'
      color='fg'
      transition='all 0.2s'
      _currentPage={{
        bg: { base: 'teal.100', _dark: 'rgba(48, 140, 122, 0.3)' },
        color: 'teal.800',
      }}
      {...rest}
    />
  )
})

function checkHref(href: string, slug: string | string[]) {
  const _slug = Array.isArray(slug) ? slug : [slug]
  const path = href.split('/')
  const pathSlug = path[path.length - 1]
  return _slug.includes(pathSlug)
}

type SidebarLinkProps = FlexProps & {
  href?: string
  icon?: React.ReactElement
  external?: boolean
}

const SidebarLink = ({
  href,
  children,
  external = false,
  ...rest
}: SidebarLinkProps) => {
  const router = useRouter()
  const isActive = checkHref(href, router.query.slug) || href === router.asPath

  const link = useRef<HTMLAnchorElement>()

  useEffect(() => {
    if (isActive && router.query.scroll === 'true') {
      link.current.scrollIntoView({ block: 'center' })
    }
  }, [isActive, router.query])

  return (
    <Flex align='center' userSelect='none' lineHeight='tall' {...rest}>
      <StyledLink asChild isActive={isActive} ref={link} external={external}>
        <NextLink href={href}>{children}</NextLink>
      </StyledLink>
    </Flex>
  )
}

export default SidebarLink
