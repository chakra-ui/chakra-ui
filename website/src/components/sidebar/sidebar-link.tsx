import { chakra, PropsOf, useColorModeValue } from "@chakra-ui/core"
import NextLink from "next/link"
import { useRouter } from "next/router"
import { forwardRef } from "react"

const StyledLink = forwardRef<HTMLAnchorElement, PropsOf<typeof chakra.a>>(
  (props, ref) => {
    const hoverColor = useColorModeValue("gray.900", "whiteAlpha.900")
    const activeColor = useColorModeValue("teal.500", "teal.200")
    const color = useColorModeValue("gray.700", "whiteAlpha.900")

    return (
      <chakra.a
        ref={ref}
        fontSize="sm"
        color={color}
        transition="all 0.2s"
        _hover={{
          color: hoverColor,
        }}
        _activeLink={{
          color: activeColor,
          fontWeight: "semibold",
        }}
        {...props}
      />
    )
  },
)

type SidebarLinkProps = PropsOf<typeof chakra.div> & {
  href?: string
  icon?: React.ReactElement
}

export const SidebarLink = (props: SidebarLinkProps): JSX.Element => {
  const { href, icon, children, ...rest } = props

  const { pathname } = useRouter()
  const isActive = pathname === href

  return (
    <chakra.div
      userSelect="none"
      display="flex"
      alignItems="center"
      lineHeight="1.5rem"
      {...rest}
    >
      <NextLink href={href} passHref>
        <StyledLink aria-current={isActive ? "page" : undefined}>
          {children}
        </StyledLink>
      </NextLink>
    </chakra.div>
  )
}
