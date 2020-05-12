import {
  chakra,
  Flex,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  useColorModeValue,
  useColorMode,
} from "@chakra-ui/core"
import NextLink from "next/link"
import { DiGithubBadge } from "react-icons/di"
import { FaMoon, FaSun } from "react-icons/fa"
import Logo from "./Logo"
import MobileNav from "./MobileNav"

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
  const bg = useColorModeValue("white", "gray.800")
  const Svg = useColorModeValue(FaMoon, FaSun)
  const [colorMode, toggleColorMode] = useColorMode()
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
            color="currentColor"
            ml="2"
            fontSize="20px"
            onClick={toggleColorMode}
            icon={<Svg />}
          />
          <MobileNav />
        </Flex>
      </Flex>
    </chakra.header>
  )
}

export default DocsHeader
