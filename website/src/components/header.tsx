import {
  Badge,
  chakra,
  Flex,
  HStack,
  Icon,
  IconButton,
  Link,
  Stack,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/core"
import NextLink from "next/link"
import React from "react"
import { DiGithubBadge } from "react-icons/di"
import { FaMoon, FaSun } from "react-icons/fa"
import Search from "./algolia-search"
import NavLink from "./header-nav-link"
import Logo from "./logo"
import MobileNav from "./mobile-nav"
import SponsorButton from "./sponsor-button"

const HeaderContent = () => {
  const { toggleColorMode: toggleMode } = useColorMode()
  const text = useColorModeValue("dark", "light")
  const SwitchIcon = useColorModeValue(FaMoon, FaSun)

  return (
    <Flex boxSize="100%" px="6" align="center" justify="space-between">
      <Flex align="center">
        <NextLink href="/" passHref>
          <chakra.a display="block" aria-label="Chakra UI, Back to homepage">
            <Logo />
          </chakra.a>
        </NextLink>
        <Badge
          px="1"
          ml="3"
          fontFamily="mono"
          borderRadius="md"
          colorScheme="teal"
          variant="solid"
        >
          v1
        </Badge>
        <HStack
          as="nav"
          spacing="4"
          ml="24px"
          display={{ base: "none", md: "flex" }}
        >
          <NavLink href="/docs/getting-started">Docs</NavLink>
          <NavLink href="/guides">Guides</NavLink>
          <NavLink href="/team">Team</NavLink>
        </HStack>
      </Flex>

      <Flex
        width={["auto", "auto", "100%"]}
        maxW="720px"
        align="center"
        color="gray.500"
      >
        <Search px="4" />
        <SponsorButton mr="5" />
        <Stack align="center" direction="row" spacing="3">
          <Link isExternal href="https://github.com/chakra-ui/chakra-ui">
            <Icon as={DiGithubBadge} boxSize="8" color="current" />
          </Link>
        </Stack>
        <IconButton
          size="md"
          fontSize="lg"
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
