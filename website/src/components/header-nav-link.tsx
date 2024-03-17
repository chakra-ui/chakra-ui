import { HTMLChakraProps, chakra } from '@chakra-ui/react'
import Link from 'next/link'
import { useRouter } from 'next/router'

function NavLink(props: HTMLChakraProps<'a'>) {
  const { href, ...rest } = props
  const { pathname } = useRouter()

  const [, group] = href.split('/')
  const isActive = pathname.includes(group)

  return (
    <chakra.a
      asChild
      aria-current={isActive ? 'page' : undefined}
      display='block'
      py='1'
      px='3'
      borderRadius='full'
      transition='all 0.3s'
      color={{ base: 'gray.600', _dark: 'whiteAlpha.800' }}
      fontWeight='normal'
      _hover={{ bg: { base: 'gray.100', _dark: 'whiteAlpha.100' } }}
      _currentPage={{
        fontWeight: 'semibold',
        color: 'teal.600',
      }}
      {...rest}
    >
      <Link href={href}>{props.children}</Link>
    </chakra.a>
  )
}

export default NavLink
