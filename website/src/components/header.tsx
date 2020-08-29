import {
  chakra,
  Flex,
  HStack,
  Icon,
  IconButton,
  Link,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/core"
import siteConfig from "configs/site-config"
import NextLink from "next/link"
import React from "react"
import { FaMoon, FaSun } from "react-icons/fa"
import NavLink from "./header-nav-link"
import Logo from "./logo"
import SponsorButton from "./sponsor-button"
import VersionSwitcher from "./version-switcher"
import MobileNav from "./mobile-nav"
import { DiscordIcon, GithubIcon } from "./icons"

const HeaderContent = () => {
  const { toggleColorMode: toggleMode } = useColorMode()
  const text = useColorModeValue("dark", "light")
  const SwitchIcon = useColorModeValue(FaMoon, FaSun)

  return (
    <Flex w="100%" h="100%" px="6" align="center" justify="space-between">
      <Flex align="center">
        <NextLink href="/" passHref>
          <chakra.a display="block" aria-label="Chakra UI, Back to homepage">
            <Logo />
          </chakra.a>
        </NextLink>
        <HStack
          as="nav"
          spacing="4"
          ml="24px"
          display={{ base: "none", md: "flex" }}
        >
          <NavLink href="/docs/getting-started">Docs</NavLink>
          <NavLink href="/guides/integrations/with-cra">Guides</NavLink>
          <NavLink href="/team">Team</NavLink>
        </HStack>
      </Flex>

      <Flex maxW="720px" align="center" color="gray.400">
        <VersionSwitcher />
        <HStack spacing="5" display={{ base: "none", sm: "flex" }}>
          <Link isExternal aria-label="GitHub" href={siteConfig.repo.url}>
            <Icon
              as={GithubIcon}
              transition="color 0.2s"
              w="5"
              h="5"
              _hover={{ color: "gray.600" }}
            />
          </Link>
          <Link isExternal aria-label="Discord" href={siteConfig.discord.url}>
            <Icon
              as={DiscordIcon}
              transition="color 0.2s"
              w="5"
              h="5"
              _hover={{ color: "gray.600" }}
            />
          </Link>
        </HStack>
        <IconButton
          size="md"
          fontSize="lg"
          aria-label={`Switch to ${text} mode`}
          variant="ghost"
          color="current"
          ml="3"
          onClick={toggleMode}
          icon={<SwitchIcon />}
        />
        <SponsorButton ml="5" display={{ base: "none", md: "flex" }} />
      </Flex>
      <MobileNav />
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
      {...props}
    >
      <chakra.div height="4.5rem" mx="auto" maxW="1024px">
        <HeaderContent />
      </chakra.div>
    </chakra.header>
  )
}

export default Header
