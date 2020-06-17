import React from "react"
import {
  Icon,
  Flex,
  IconButton,
  useColorMode,
  Link,
  Stack,
  HStack,
  chakra,
  useColorModeValue,
} from "@chakra-ui/core"
import { DiGithubBadge } from "react-icons/di"
import { FaMoon, FaSun } from "react-icons/fa"
import Search from "./algolia-search"
import Logo from "./logo"
import StorybookIcon from "./storybook-icon"
import { Link as GatsbyLink } from "gatsby"
import SponsorButton from "./sponsor-button"
import MobileNav from "./mobile-nav"
import { useLocation } from "@reach/router"

export const NavLink = (props) => {
  const { to, ...rest } = props
  const { pathname } = useLocation()

  const group = to.split("/")[1]
  const isActive = pathname.includes(group)

  return (
    <chakra.a
      aria-current={isActive ? "page" : undefined}
      as={GatsbyLink}
      to={to}
      display="block"
      color={useColorModeValue("gray.600", "whiteAlpha.800")}
      fontWeight="normal"
      _hover={{ color: "teal.500" }}
      _activeLink={{
        fontWeight: "semibold",
        color: "teal.500",
      }}
      {...rest}
    />
  )
}

const HeaderContent = () => {
  const [, toggleMode] = useColorMode()
  const text = useColorModeValue("dark", "light")
  const SwitchIcon = useColorModeValue(FaMoon, FaSun)

  return (
    <Flex boxSize="100%" px="6" align="center" justify="space-between">
      <Flex align="center">
        <chakra.a
          as={GatsbyLink}
          to="/"
          display="block"
          aria-label="Chakra UI, Back to homepage"
        >
          <Logo />
        </chakra.a>
        <HStack
          as="nav"
          spacing="8"
          ml="32px"
          display={["none", "none", "flex", "flex"]}
        >
          <NavLink to="/docs/getting-started">Docs</NavLink>
          <NavLink to="/guides">Guides</NavLink>
          <NavLink to="/team">Team</NavLink>
        </HStack>
      </Flex>

      <Flex
        width={["auto", "auto", "100%"]}
        maxW="720px"
        align="center"
        color="gray.500"
      >
        <Search paddingX="4" />
        <SponsorButton mr="5" />
        <Stack align="center" direction="row" spacing="3">
          <Link
            isExternal
            href="https://github.com/chakra-ui/chakra-ui/tree/master/packages/chakra-ui"
          >
            <Icon as={DiGithubBadge} boxSize="8" color="current" />
          </Link>
          <Link isExternal href="https://chakra-ui.netlify.com">
            <Icon as={StorybookIcon} boxSize="6" color="current" />
          </Link>
        </Stack>
        <IconButton
          size="md"
          aria-label={`Switch to ${text} mode`}
          variant="ghost"
          color="current"
          marginLeft="2"
          onClick={toggleMode}
          icon={<SwitchIcon />}
        />
        <MobileNav />
      </Flex>
    </Flex>
  )
}

const Header = (props) => {
  const bg = useColorModeValue("white", "gray.800")
  return (
    <chakra.header
      pos="fixed"
      top="0"
      zIndex="1"
      bg={bg}
      left="0"
      right="0"
      borderBottomWidth="1px"
      width="full"
      height="4rem"
      {...props}
    >
      <HeaderContent />
    </chakra.header>
  )
}

export default Header
