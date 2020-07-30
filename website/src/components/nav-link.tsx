import { chakra, PropsOf, useColorModeValue } from "@chakra-ui/core"
import { useRouter } from "next/router"
import NextLink from "next/link"
import React, { cloneElement, forwardRef } from "react"

const StyledLink = chakra("a", {
  baseStyle: {
    display: "block",
    transition: "all 0.2s",
    borderRadius: "sm",
    outline: "none",
    px: "2",
    py: "1",
    mt: 1,
    _first: {
      mt: 0,
    },
    _focus: {
      boxShadow: "outline",
    },
  },
})

type SideNavLinkProps = PropsOf<typeof StyledLink> & {
  icon?: React.ReactElement
}

export const SideNavLink = forwardRef(
  (props: SideNavLinkProps, ref: React.Ref<any>) => {
    const { children, icon, href, ...rest } = props
    const color = useColorModeValue("gray.700", "whiteAlpha.900")

    return (
      <NextLink href={href} passHref>
        <StyledLink ref={ref} mx={-2} color={color} {...rest}>
          {icon && cloneElement(icon, { mr: 3 })}
          <span>{children}</span>
        </StyledLink>
      </NextLink>
    )
  },
)

type TopNavLinkProps = PropsOf<typeof StyledLink>

export const TopNavLink = forwardRef(
  (props: TopNavLinkProps, ref: React.Ref<any>) => {
    const { href, ...rest } = props
    const { pathname } = useRouter()
    const isActive = pathname === href

    return (
      <SideNavLink
        href={href}
        ref={ref}
        _hover={{ color: !isActive ? "inherit" : null }}
        _activeLink={{
          color: "teal.500",
          fontWeight: "semibold",
        }}
        {...rest}
      />
    )
  },
)

type ComponentLinkProps = PropsOf<typeof StyledLink>

export const ComponentLink = forwardRef(
  (props: ComponentLinkProps, ref: React.Ref<any>) => {
    const { href, ...rest } = props
    const hoverColor = useColorModeValue("gray.900", "whiteAlpha.900")
    const activeColor = useColorModeValue("teal.800", "teal.200")
    const activeBg = useColorModeValue("teal.50", "#308c7a4d")

    return (
      <SideNavLink
        ref={ref}
        href={href}
        _hover={{
          color: hoverColor,
          transform: "translateX(2px)",
        }}
        _activeLink={{
          bg: activeBg,
          color: activeColor,
          fontWeight: "semibold",
        }}
        {...rest}
      />
    )
  },
)
