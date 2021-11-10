import { chakra, HTMLChakraProps, useColorModeValue } from "@chakra-ui/react"
import NextLink from "next/link"
import { useRouter } from "next/router"
import React from "react"

function NavLink(props: HTMLChakraProps<"a">) {
  const { href, ...rest } = props
  const { pathname } = useRouter()

  const [, group] = href.split("/")
  const isActive = pathname.includes(group)

  return (
    <NextLink href={href} passHref>
      <chakra.a
        aria-current={isActive ? "page" : undefined}
        display="block"
        py="1"
        px="3"
        borderRadius="full"
        transition="all 0.3s"
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
