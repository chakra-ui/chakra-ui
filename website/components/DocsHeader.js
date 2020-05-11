/** @jsx jsx */
import {
  Box,
  Flex,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  IconButton,
  useColorMode,
  chakra,
} from "@chakra-ui/core"
import { jsx } from "@emotion/core"
import { DiGithubBadge } from "react-icons/di"
import Logo from "./Logo"
import NextLink from "next/link"
import MobileNav from "./MobileNav"
import { FaMoon, FaSun } from "react-icons/fa"

const SearchBox = props => (
  <InputGroup {...props}>
    <InputLeftElement>
      <Icon name="search" color="gray.500" />
    </InputLeftElement>
    <Input
      variant="filled"
      placeholder="Search the docs "
      _focusBorderColor="teal"
      _placeholder={{ color: "gray.500", opacity: 1 }}
      borderRadius="lg"
    />
  </InputGroup>
)

const DocsHeader = props => {
  const [colorMode, toggleColorMode] = useColorMode()
  const bg = { light: "white", dark: "gray.800" }
  return (
    <Box
      pos="fixed"
      as="header"
      top="0"
      zIndex="4"
      bg={bg[colorMode]}
      left="0"
      right="0"
      borderBottomWidth="1px"
      width="full"
      height="4rem"
      {...props}
    >
      <Flex boxSize="100%" px="6" align="center">
        <Flex align="center" mr={5}>
          <NextLink href="/" passHref>
            <chakra.a display="block" aria-label="Chakra UI, Back to homepage">
              <Logo />
            </chakra.a>
          </NextLink>
        </Flex>
        <SearchBox
          display={{ sm: "none", md: "block" }}
          visibility="hidden"
          maxWidth="3xl"
          mx="auto"
          flex="1"
        />
        <Flex
          flex={{ sm: "1", md: "none" }}
          ml={5}
          align="center"
          color="gray.500"
          justify="flex-end"
        >
          <chakra.a
            as="a"
            href="https://github.com/chakra-ui/chakra-ui/tree/master/packages/chakra-ui"
            rel="noopener noreferrer"
            target="_blank"
          >
            <Icon as={DiGithubBadge} boxSize="8" color="current" />
          </chakra.a>
          <IconButton
            aria-label={`Switch to ${
              colorMode === "light" ? "dark" : "light"
            } mode`}
            variant="ghost"
            color="current"
            ml="2"
            fontSize="20px"
            onClick={toggleColorMode}
            icon={colorMode === "light" ? <FaMoon /> : <FaSun />}
          />
          <MobileNav />
        </Flex>
      </Flex>
    </Box>
  )
}

export default DocsHeader
