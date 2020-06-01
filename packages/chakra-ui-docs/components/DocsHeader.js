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
  PseudoBox,
} from "@chakra-ui/core";
import { jsx, css } from "@emotion/core";
import { DiGithubBadge } from "react-icons/di";
import Logo from "./Logo";
import MobileNav from "./MobileNav";
import SponsorButton from "./SponsorButton";
import { StorybookIcon } from "./Storybook-icon";

const styles = css`
  .algolia-autocomplete {
    display: block !important;
  }

  .algolia-docsearch-suggestion--wrapper {
    /* display: none !important; */
  }
`;

const SearchBox = props => (
  <InputGroup css={styles} {...props}>
    <InputLeftElement>
      <Icon name="search" color="gray.500" />
    </InputLeftElement>
    <Input
      id="algolia-search"
      variant="filled"
      placeholder="Search the docs "
      _focusBorderColor="teal"
      _placeholder={{ color: "gray.500", opacity: 1 }}
      rounded="lg"
    />
  </InputGroup>
);

export const Header = props => (
  <Box
    pos="fixed"
    as="header"
    top="0"
    zIndex="4"
    left="0"
    right="0"
    borderBottomWidth="1px"
    width="full"
    height="4rem"
    {...props}
  />
);

export const GithubLink = props => (
  <PseudoBox
    as="a"
    href="https://github.com/chakra-ui/chakra-ui"
    rel="noopener noreferrer"
    target="_blank"
    aria-label="Go to Chakra UI's Github Repo"
    outline="0"
    transition="all 0.2s"
    borderRadius="md"
    _focus={{
      boxShadow: "outline",
    }}
    {...props}
  >
    <Box as={DiGithubBadge} size="8" color="current" />
  </PseudoBox>
);

const ThemeSwitch = props => (
  <IconButton
    variant="ghost"
    color="current"
    ml="2"
    fontSize="20px"
    {...props}
  />
);

export const StorybookLink = props => (
  <PseudoBox
    as="a"
    href="https://chakra-ui.netlify.com"
    rel="noopener noreferrer"
    target="_blank"
    size="32px"
    display="flex"
    alignItems="center"
    justifyContent="center"
    borderRadius="md"
    isExternal
    {...props}
  >
    <Box as={StorybookIcon} size="6" color="current" />
  </PseudoBox>
);

const DocsHeader = props => {
  const { colorMode, toggleColorMode } = useColorMode();
  const bg = { light: "white", dark: "gray.800" };
  return (
    <Header bg={bg[colorMode]} {...props}>
      <Flex size="100%" px="6" align="center" justify="space-between">
        <Flex align="center" mr={5}>
          <Logo />
        </Flex>
        <Flex
          flex={{ sm: "1", md: "none" }}
          ml={5}
          align="center"
          color="gray.500"
          justify="flex-end"
        >
          <SponsorButton />
          <GithubLink />
          <StorybookLink ml="3" />
          <ThemeSwitch
            aria-label={`Switch to ${
              colorMode === "light" ? "dark" : "light"
            } mode`}
            onClick={toggleColorMode}
            icon={colorMode === "light" ? "moon" : "sun"}
          />

          <MobileNav />
        </Flex>
      </Flex>
    </Header>
  );
};

export default DocsHeader;
