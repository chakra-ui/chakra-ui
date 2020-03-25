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
import { DiGithubBadge } from "react-icons/di";
import Logo from "./Logo";
import GitHubButton from "./GitHubButton";
import { Container } from "../pages";
import { StorybookIcon } from "./Storybook-icon";

const Header = props => {
  const { colorMode, toggleColorMode } = useColorMode();
  const bg = { light: "white", dark: "gray.800" };
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
      <Container h="100%">
        <Flex
          size="100%"
          px={["0", "0", "6"]}
          align="center"
          justify="space-between"
        >
          <Box
            as="a"
            d="block"
            href="/"
            aria-label="Chakra UI, Back to homepage"
          >
            <Logo />
          </Box>
          <Flex align="center" color="gray.500">
            <Stack align="center" isInline spacing="3">
              <Box as="span" mb="-8px" display={["none", "flex"]}>
                <GitHubButton />
              </Box>
              <Link
                isExternal
                href="https://github.com/chakra-ui/chakra-ui/tree/master/packages/chakra-ui"
              >
                <Box as={DiGithubBadge} size="8" color="current" />
              </Link>

              <Link isExternal href="https://chakra-ui.netlify.com">
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
    </Box>
  );
};

export default Header;
