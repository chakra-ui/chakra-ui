import React, { cloneElement, forwardRef } from "react"
import { Box, useColorMode, chakra } from "@chakra-ui/core"
import { Link } from "gatsby"
import { useLocation } from "@reach/router"

const useIsActiveLink = href => {
  const location = useLocation()
  return location.pathname === href
}

export const SideNavLink = forwardRef(
  ({ children, icon, href, ...props }, ref) => {
    const [colorMode] = useColorMode()
    const color = colorMode === "light" ? "gray.700" : "whiteAlpha.700"

    return (
      <chakra.a
        as={Link}
        to={href}
        ref={ref}
        mx={-2}
        display="flex"
        cursor="pointer"
        alignItems="center"
        px="2"
        py="1"
        transition="all 0.2s"
        fontWeight="medium"
        outline="none"
        _focus={{ boxShadow: "outline" }}
        color={color}
        mt="1"
        _first={{ mt: 0 }}
        {...props}
      >
        {icon && cloneElement(icon, { mr: 3 })}
        <Box>{children}</Box>
      </chakra.a>
    )
  },
)

export const TopNavLink = forwardRef(({ href, ...props }, ref) => {
  const isActive = useIsActiveLink(href)

  return (
    <SideNavLink
      href={href}
      ref={ref}
      aria-current={isActive ? "page" : undefined}
      _hover={{ color: !isActive ? "inherit" : null }}
      {...(isActive && { color: "teal.500", fontWeight: "semibold" })}
      {...props}
    />
  )
})

export const ComponentLink = forwardRef(({ href, ...props }, ref) => {
  const [colorMode] = useColorMode()
  const isActive = useIsActiveLink(href)
  const hoverColor = { light: "gray.900", dark: "whiteAlpha.900" }
  const activeColor = { light: "teal.800", dark: "teal.200" }
  const activeBg = { light: "teal.50", dark: "#308c7a4d" }

  return (
    <SideNavLink
      ref={ref}
      href={href}
      aria-current={isActive ? "page" : undefined}
      _hover={{
        color: hoverColor[colorMode],
        transform: "translateX(2px)",
      }}
      {...(isActive && {
        bg: activeBg[colorMode],
        borderRadius: "sm",
        color: activeColor[colorMode],
      })}
      {...props}
    />
  )
})
