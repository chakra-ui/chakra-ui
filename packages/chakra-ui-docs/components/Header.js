/** @jsx jsx */
import {
  Box,
  Fixed,
  Flex,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  IconButton,
  useColorMode,
} from "@chakra-ui/core";
import { jsx } from "@emotion/core";
import { DiGithubBadge } from "react-icons/di";
import Logo from "./Logo";

const SearchBox = props => {
  return (
    <InputGroup {...props}>
      <InputLeftElement>
        <Icon name="search" color="gray.500" />
      </InputLeftElement>
      <Input
        variant="filled"
        placeholder='Search the docs (Press "/" to focus)'
        _placeholder={{ color: "gray.500", opacity: 1 }}
        rounded="lg"
      />
    </InputGroup>
  );
};

const Header = props => {
  const { mode, toggle } = useColorMode();
  const bg = { light: "white", dark: "gray.800" };
  return (
    <Fixed
      as="header"
      top="0"
      zIndex="1"
      bg={bg[mode]}
      left="0"
      right="0"
      borderBottomWidth="1px"
      width="full"
      height="4rem"
      {...props}
    >
      <Flex size="100%" px="6" align="center">
        <Flex align="center" mr={5}>
          <a
            style={{ display: "block" }}
            href="/"
            aria-label="Chakra UI, Back to homepage"
          >
            <Logo />
          </a>
        </Flex>
        <SearchBox maxWidth="600px" mx="auto" flex="1" />
        <Flex
          // flexShrink="10"
          ml={5}
          align="center"
          color="gray.500"
          justify="flex-end"
        >
          <Box as={DiGithubBadge} size="7" color="current" />
          <IconButton
            aria-label={`Switch to ${mode === "light" ? "dark" : "light"} mode`}
            variant="ghost"
            color="current"
            ml="2"
            fontSize="20px"
            onClick={toggle}
            icon={mode === "light" ? "moon" : "sun"}
          />
        </Flex>
      </Flex>
    </Fixed>
  );
};

export default Header;
