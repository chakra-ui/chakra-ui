import { chakra, PropsOf, useColorModeValue } from "@chakra-ui/react"
import NextLink from "next/link"
import { useRouter } from "next/router"
import React from "react"

const StyledLink = React.forwardRef(
  (
    props: PropsOf<typeof chakra.a> & { isActive?: boolean },
    ref: React.Ref<any>,
  ) => {
    const { isActive, ...rest } = props

    return (
      <chakra.a
        aria-current={isActive ? "page" : undefined}
        width="100%"
        px="3"
        py="1"
        rounded="md"
        ref={ref}
        fontSize="sm"
        fontWeight="500"
        color={useColorModeValue("gray.700", "whiteAlpha.900")}
        transition="all 0.2s"
        _activeLink={{
          bg: useColorModeValue("teal.50", "rgba(48, 140, 122, 0.3)"),
          color: useColorModeValue("teal.700", "teal.200"),
          fontWeight: "600",
        }}
        {...rest}
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
        <StyledLink isActive={isActive}>{children}</StyledLink>
      </NextLink>
    </chakra.div>
  )
}

export default SidebarLink
