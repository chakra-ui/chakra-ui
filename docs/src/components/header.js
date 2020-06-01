import React from "react"
import {
  Box,
  Flex,
  IconButton,
  useColorMode,
  Link,
  Stack,
  chakra,
  useColorModeValue,
} from "@chakra-ui/core"
import { DiGithubBadge } from "react-icons/di"
import { FaMoon, FaSun } from "react-icons/fa"
import { Container } from "./container"
import { Search } from "./search"
import Logo from "./logo"
import StorybookIcon from "./storybook-icon"
import { Link as GatsbyLink } from "gatsby"
import SponsorButton from "./sponsor-button"
import MobileNav from "./mobile-nav"

const HeaderContent = () => {
  const [, toggleColorMode] = useColorMode()
  const text = useColorModeValue("dark", "light")
  const Icon = useColorModeValue(FaMoon, FaSun)

  return (
    <Flex boxSize="100%" px="6" align="center" justify="space-between">
      <chakra.a
        as={GatsbyLink}
        display="block"
        to="/"
        aria-label="Chakra UI, Back to homepage"
      >
        <Logo />
      </chakra.a>

      <Search />

      <Flex align="center" color="gray.500">
        <SponsorButton mr="5" />
        <Stack align="center" direction="row" spacing="3">
          <Link
            isExternal
            href="https://github.com/chakra-ui/chakra-ui/tree/master/packages/chakra-ui"
          >
            <Box as={DiGithubBadge} boxSize="8" color="current" />
          </Link>
          <Link isExternal href="https://chakra-ui.netlify.com">
            <Box as={StorybookIcon} boxSize="6" color="current" />
          </Link>
        </Stack>
        <IconButton
          size="md"
          aria-label={`Switch to ${text} mode`}
          variant="ghost"
          color="current"
          marginLeft="2"
          // fontSize="20px"
          onClick={toggleColorMode}
          icon={<Icon />}
        />
        <MobileNav />
      </Flex>
    </Flex>
  )
}

const Header = ({ isConstrained, ...props }) => {
  const bg = useColorModeValue("white", "gray.800")
  return (
    <chakra.header
      pos="fixed"
      top="0"
      zIndex="4"
      bg={bg}
      left="0"
      right="0"
      borderBottomWidth="1px"
      width="full"
      height="4rem"
      {...props}
    >
      {isConstrained ? (
        <Container h="100%">
          <HeaderContent />
        </Container>
      ) : (
        <HeaderContent />
      )}
    </chakra.header>
  )
}

export default Header
