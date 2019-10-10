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
import { Container } from "../pages";

const StorybookIcon = props => (
  <svg
    aria-hidden="true"
    focusable="false"
    width="0.81em"
    height="1em"
    viewBox="0 0 256 319"
    {...props}
  >
    <defs>
      <path
        d="M9.872 293.324L.012 30.574C-.315 21.895 6.338 14.54 15.005 14L238.494.032c8.822-.552 16.42 6.153 16.972 14.975.02.332.031.665.031.998v286.314c0 8.839-7.165 16.004-16.004 16.004-.24 0-.48-.005-.718-.016l-213.627-9.595c-8.32-.373-14.963-7.065-15.276-15.388z"
        id="IconifyId-16cf64ad71c-1b4c9-8"
      />
    </defs>
    <mask id="IconifyId-16cf64ad71c-1b4c9-9" fill="#fff">
      <use href="#IconifyId-16cf64ad71c-1b4c9-8" />
    </mask>
    <use fill="currentColor" href="#IconifyId-16cf64ad71c-1b4c9-8" />
    <path
      d="M188.665 39.127l1.527-36.716L220.884 0l1.322 37.863a2.387 2.387 0 01-3.864 1.96l-11.835-9.325-14.013 10.63a2.387 2.387 0 01-3.829-2.001zm-39.251 80.853c0 6.227 41.942 3.243 47.572-1.131 0-42.402-22.752-64.684-64.415-64.684-41.662 0-65.005 22.628-65.005 56.57 0 59.117 79.78 60.249 79.78 92.494 0 9.052-4.433 14.426-14.184 14.426-12.705 0-17.729-6.49-17.138-28.552 0-4.786-48.458-6.278-49.936 0-3.762 53.466 29.548 68.887 67.665 68.887 36.935 0 65.892-19.687 65.892-55.326 0-63.36-80.961-61.663-80.961-93.06 0-12.728 9.455-14.425 15.07-14.425 5.909 0 16.546 1.042 15.66 24.801z"
      fill="#FFF"
      mask="url(#IconifyId-16cf64ad71c-1b4c9-9)"
    />
  </svg>
);

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
        <Flex size="100%" px="6" align="center" justify="space-between">
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
