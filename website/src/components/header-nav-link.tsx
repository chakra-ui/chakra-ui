import { chakra, useColorModeValue } from "@chakra-ui/core"
import NextLink from "next/link"
import { useRouter } from "next/router"
import React from "react"

const NavLink = (props) => {
  const { href, ...rest } = props
  const { pathname } = useRouter()

  const group = href.split("/")[1]
  const isActive = pathname.includes(group)

  return (
    <NextLink href={href} passHref>
      <chakra.a
        aria-current={isActive ? "page" : undefined}
        display="block"
        py="1"
        px="3"
        borderRadius="4px"
        transition="all 0.2s"
        color={useColorModeValue("gray.600", "whiteAlpha.800")}
        fontWeight="normal"
        _hover={{ bg: useColorModeValue("gray.100", "whiteAlpha.100") }}
        _activeLink={{
          fontWeight: "semibold",
          color: "teal.500",
        }}
        {...rest}
      />
    </NextLink>
  )
}

export default NavLink
