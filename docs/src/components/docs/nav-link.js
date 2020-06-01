import { chakra, useColorModeValue } from "@chakra-ui/core"
import { useLocation } from "@reach/router"
import { Link } from "gatsby"
import React, { cloneElement, forwardRef } from "react"

const StyledLink = chakra(Link, {
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

export const SideNavLink = forwardRef((props, ref) => {
  const { children, icon, href, ...rest } = props
  const color = useColorModeValue("gray.700", "whiteAlpha.700")

  return (
    <StyledLink to={href} ref={ref} mx={-2} color={color} {...rest}>
      {icon && cloneElement(icon, { mr: 3 })}
      <span>{children}</span>
    </StyledLink>
  )
})

export const TopNavLink = forwardRef((props, ref) => {
  const { href, ...rest } = props
  const { pathname } = useLocation()
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
})

export const ComponentLink = forwardRef((props, ref) => {
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
})
