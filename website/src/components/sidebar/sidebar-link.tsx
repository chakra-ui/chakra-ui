import { chakra, PropsOf, useColorModeValue } from "@chakra-ui/core"
import NextLink from "next/link"
import { useRouter } from "next/router"
import React, { cloneElement, forwardRef } from "react"

type SidebarLinkProps = PropsOf<typeof chakra.a> & {
  icon?: React.ReactElement
}

const SidebarLink = forwardRef(
  (props: SidebarLinkProps, ref: React.Ref<any>) => {
    const { href, icon, children, ...rest } = props

    const hoverColor = useColorModeValue("gray.900", "whiteAlpha.900")
    const activeColor = useColorModeValue("gray.800", "teal.200")
    const color = useColorModeValue("gray.700", "whiteAlpha.900")

    const { pathname } = useRouter()
    const isActive = pathname === href

    return (
      <NextLink href={href} passHref>
        <chakra.a
          aria-current={isActive ? "page" : undefined}
          ref={ref}
          display="flex"
          alignItems="center"
          fontSize="1rem"
          lineHeight="1.5rem"
          color={color}
          transition="all 0.2s"
          _hover={{
            color: hoverColor,
          }}
          _activeLink={{
            color: activeColor,
            fontWeight: "semibold",
          }}
          {...rest}
        >
          <chakra.div
            flexShrink={0}
            w="4px"
            h="4px"
            rounded="full"
            mr="20px"
            bg="gray.400"
          />
          <div>{children}</div>
        </chakra.a>
      </NextLink>
    )
  },
)

export default SidebarLink
