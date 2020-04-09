/** @jsx jsx */
import {
  Box,
  Flex,
  IconButton,
  useColorMode,
  Link,
  Stack,
} from "@chakra-ui/core";
import { jsx } from "@emotion/core";
import Logo from "./Logo";
import GitHubButton from "./GitHubButton";
import { Container } from "../pages";
import { StorybookIcon } from "./Storybook-icon";
import { Header as HeaderContainer, GithubLink } from "./DocsHeader";
import SponsorButton from "./SponsorButton";

const Header = props => {
  const { colorMode, toggleColorMode } = useColorMode();
  const bg = { light: "white", dark: "gray.800" };
  return (
    <HeaderContainer bg={bg[colorMode]} {...props}>
      <Container h="100%">
        <Flex
          size="100%"
          px={["0", "0", "6"]}
          align="center"
          justify="space-between"
        >
          <Box display="flex" alignItems="center">
            <Logo />
            <Box ml="5" mb="-8px" display={["none", "flex"]}>
              <GitHubButton />
            </Box>
          </Box>
          <Flex align="center" color="gray.500">
            <SponsorButton mr="4" />
            <Stack align="center" isInline spacing="3">
              <GithubLink />
              <Link
                size="32px"
                display="flex"
                alignItems="center"
                justifyContent="center"
                borderRadius="md"
                isExternal
                href="https://chakra-ui.netlify.com"
              >
                <Box as={StorybookIcon} size="6" color="current" />
              </Link>
            </Stack>
            <IconButton
              aria-label={`Switch to ${
                colorMode === "light" ? "dark" : "light"
              } mode`}
              variant="ghost"
              color="current"
              ml="2"
              fontSize="20px"
              onClick={toggleColorMode}
              icon={colorMode === "light" ? "moon" : "sun"}
            />
          </Flex>
        </Flex>
      </Container>
    </HeaderContainer>
  );
};

export default Header;
