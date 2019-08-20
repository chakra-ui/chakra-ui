/** @jsx jsx */
import { jsx } from "@emotion/core";
import {
  Box,
  Heading,
  Text,
  ButtonGroup,
  Button,
  Grid,
  Image,
} from "@chakra-ui/core";
import { useRouter } from "next/router";
import Logo from "../components/Logo";

const Container = props => (
  <Box width="full" maxWidth="1024px" mx="auto" px="24px" {...props} />
);

const Feature = ({ title, children, ...props }) => {
  return (
    <Box {...props}>
      <Heading as="h2" size="lg" my={5}>
        {title}
      </Heading>
      <Text my={5}>{children}</Text>
    </Box>
  );
};

const badges = [
  {
    src: "https://flat.badgen.net/circleci/github/system-ui/theme-ui/master",
    alt: "Build Status",
  },
  {
    src: "https://flat.badgen.net/npm/v/theme-ui",
    alt: "Version",
  },
  {
    src: "https://flat.badgen.net/badge/license/MIT/blue",
    alt: "MIT License",
  },
  {
    src: "https://flat.badgen.net/badge/system-ui/theme/black",
    alt: "system-ui/theme badge",
  },
  {
    src: "https://flat.badgen.net/bundlephobia/minzip/theme-ui",
    alt: "bundle size badge",
  },
];

export default () => {
  const router = useRouter();
  return (
    <Box mb="80px">
      <Box
        as="section"
        minH="100vh"
        borderTop="10px solid"
        borderColor="teal.500"
        display="flex"
        flexDirection="column"
        justifyContent="center"
      >
        <Container>
          <Heading color="teal.500" fontWeight="bold" fontSize="6xl">
            Chakra UI
          </Heading>

          <Text mt="16px" fontSize="2xl">
            Build consistent, themeable React apps based on constraint-based
            design principles
          </Text>

          <Text mt="32px" fontSize="xl" fontWeight="bold">
            Emotion + Styled System + Reach UI
          </Text>

          <ButtonGroup size="lg" spacing={4} mt={7}>
            <Button
              variantColor="teal"
              onClick={() => router.push("/getting-started")}
            >
              Documentation
            </Button>
            <Button
              as="a"
              href="https://github.com/chakra-ui/chakra-ui/"
              target="__blank"
            >
              Github
            </Button>
          </ButtonGroup>
          {/* <Box mt={8}>
            {badges.map(badge => (
              <Image mr={2} display="inline-block" {...badge} />
            ))}
          </Box> */}
        </Container>
      </Box>

      <Container>
        <Grid
          gridTemplateColumns={{ sm: "repeat(1, 1fr)", md: "repeat(3, 1fr)" }}
          gridGap={{ sm: "24px", md: "40px" }}
        >
          <Feature title="Accessible">
            Chakra UI strictly follows <strong>WAI-ARIA 1.1</strong> standards.
            All components come with proper attributes and keyboard interactions
            out of the box.
          </Feature>
          <Feature title="Themeable">
            Quickly and easily reference values from your theme throughout your
            entire application, on any component
          </Feature>
          <Feature title="Composition">
            Chakra UI components were built with composition in mind. You can
            leverage any component or hook to create new things.
          </Feature>
        </Grid>
      </Container>
    </Box>
  );
};
