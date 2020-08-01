import { chakra, PropsOf, useColorModeValue } from "@chakra-ui/core"
import NextLink from "next/link"
import { useRouter } from "next/router"
import React from "react"

const StyledLink = React.forwardRef(
  (props: PropsOf<typeof chakra.a>, ref: React.Ref<any>) => {
    const hoverColor = useColorModeValue("gray.900", "whiteAlpha.900")
    const activeColor = useColorModeValue("gray.800", "teal.200")
    const color = useColorModeValue("gray.700", "whiteAlpha.900")

    return (
      <chakra.a
        ref={ref}
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

const SidebarLink = (props: SidebarLinkProps) => {
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

export default SidebarLink
