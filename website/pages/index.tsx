import * as React from "react"
import NextLink from "next/link"
import {
  Box,
  Heading,
  Text,
  Button,
  Grid,
  Divider,
  Flex,
  Wrap,
  Icon,
  Stack,
  chakra,
  Center,
} from "@chakra-ui/core"
import { DiGithubBadge } from "react-icons/di"
import { MdAccessibility, MdPalette, MdGrain } from "react-icons/md"
import { IoMdMoon } from "react-icons/io"
import { LiveProvider, LiveEditor, LiveError, LivePreview } from "react-live"
import theme from "prism-react-renderer/themes/nightOwl"
import * as Chakra from "@chakra-ui/core"
import * as ReactMdIcons from "react-icons/md"
import { Container } from "components/container"
import { Footer } from "components/footer"
import SEO from "components/seo"
import users from "chakra-users"
import { AiFillThunderbolt } from "react-icons/ai"
import { FaDiscord } from "react-icons/fa"
import TweetCard from "components/tweet-card"
import tweets from "configs/tweets"
import { chunk } from "@chakra-ui/utils"
import LogoMark from "components/logo-mark"
import Header from "components/header"
import DiscordStrip from "components/discord-strip"

const Feature = ({ title, icon, children, ...props }) => {
  return (
    <Box bg="white" rounded="12px" shadow="base" p="40px" {...props}>
      <Flex
        rounded="full"
        w="12"
        h="12"
        bg="teal.500"
        align="center"
        justify="center"
      >
        <Icon fontSize="24px" color="white" as={icon} />
      </Flex>
      <Heading as="h5" size="md" fontWeight="semibold" mt="1em" mb="0.5em">
        {title}
      </Heading>
      <Text fontSize="lg" opacity={0.7}>
        {children}
      </Text>
    </Box>
  )
}

const PageHeading = (props) => (
  <chakra.h1
    textAlign="center"
    fontWeight="bold"
    letterSpacing="tight"
    lineHeight="1.24"
    fontSize="2.75rem"
    mt="6"
    mb="6"
    {...props}
  />
)

const sampleCode = `
// Sample component from airbnb.com

<Box>
  <Image borderRadius="md" src="https://bit.ly/2k1H1t6"/>
  <Flex align="baseline" mt={2}>
    <Badge colorScheme="pink">Plus</Badge>
    <Text
      ml={2}
      textTransform="uppercase"
      fontSize="sm"
      fontWeight="bold"
      color="pink.800"
    >
    Verified &bull; Cape Town
    </Text>
  </Flex>
  <Text mt={2} fontSize="xl" fontWeight="semibold" lineHeight="short">
    Modern, Chic Penthouse with Mountain, City & Sea Views
  </Text>
  <Text mt={2}>$119/night</Text>
  <Flex mt={2} align="center">
    <Box as={MdStar} color="orange.400" />
    <Text ml={1} fontSize="sm"><b>4.84</b> (190)</Text>
  </Flex>
</Box>
`

const HomePage = () => {
  return (
    <>
      <SEO
        title="Chakra UI - A simple, modular and accessible component library that gives you the building blocks you need to build your React applications."
        description="Simple, Modular and Accessible UI Components for your React Applications. Built with Styled System"
      />
      <Header />
      <Box mb={20}>
        <Box as="section" pt={40} pb={24}>
          <Container>
            <Box maxW="800px" mx="auto" textAlign="center">
              <chakra.h4
                fontWeight="semibold"
                textTransform="uppercase"
                color="teal.500"
                letterSpacing="widest"
                mb="32px"
              >
                Welcome to Chakra UI
              </chakra.h4>
              <chakra.h1
                fontSize={{ base: "2.25rem", md: "3rem", lg: "4rem" }}
                letterSpacing="tight"
                fontWeight="bold"
                mb="16px"
                lineHeight="1.2"
              >
                Build accessible React apps
                <Box as="span" color="teal.500">
                  {" "}
                  with speed
                </Box>
              </chakra.h1>

              <Text opacity={0.7} fontSize="xl" mt="6">
                Chakra UI is a simple, modular and accessible component library
                that gives you the building blocks you need to build your React
                applications.
              </Text>

              <Stack
                mt="10"
                spacing="4"
                justify="center"
                direction={{ base: "column", sm: "row" }}
              >
                <NextLink href="/docs/getting-started" passHref>
                  <Button
                    h="4rem"
                    px="40px"
                    rounded="12px"
                    fontSize="1.2rem"
                    as="a"
                    size="lg"
                    colorScheme="teal"
                  >
                    {`Get Started ->`}
                  </Button>
                </NextLink>
                <Button
                  as="a"
                  size="lg"
                  h="4rem"
                  px="40px"
                  rounded="12px"
                  fontSize="1.2rem"
                  href="https://github.com/chakra-ui/chakra-ui/"
                  target="__blank"
                  leftIcon={<DiGithubBadge size="1.5em" />}
                >
                  GitHub
                </Button>
              </Stack>
            </Box>
          </Container>
        </Box>

        <Divider mt={16} />

        <Box as="section" pt="48px" pb="72px">
          <Container textAlign="center">
            <chakra.p
              textTransform="uppercase"
              fontSize="sm"
              letterSpacing="widest"
              fontWeight="medium"
              color="teal.500"
              mb="48px"
            >
              Trusted in Production By
            </chakra.p>
            <Wrap
              maxW="800px"
              mx="auto"
              justify="center"
              align="center"
              spacing="50px"
            >
              {users.map((user) => {
                const hasLogo = user.image.includes(".")
                if (hasLogo) {
                  return <chakra.img h="24px" w="auto" src={user.image} />
                }
                return null
              })}
              <Box
                p="4"
                border="1px dashed"
                borderColor="teal.200"
                rounded="md"
                bg="teal.50"
              >
                <Box as="span" mr="1" role="img">
                  💖
                </Box>{" "}
                Your company
              </Box>
            </Wrap>
          </Container>
        </Box>

        <Divider />

        <Box as="section" bg="gray.50">
          <Container py="120px">
            <Box maxW="760px" mx="auto" textAlign="center" mb="56px">
              <chakra.h1
                fontWeight="bold"
                letterSpacing="tight"
                lineHeight="1.24"
                fontSize="2.75rem"
                mb="5"
              >
                An experience you'd expect from a design system.
              </chakra.h1>
              <chakra.p opacity={0.7} fontSize="lg">
                Opinionated and designed for daily use.
              </chakra.p>
            </Box>
            <Grid
              templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(3, 1fr)" }}
              gap={10}
              px={{ md: 12 }}
            >
              <Feature icon={MdAccessibility} title="Accessible">
                Chakra UI strictly follows WAI-ARIA standards for all
                components.
              </Feature>
              <Feature icon={MdPalette} title="Themeable">
                Customize any part of our components to match your design needs.
              </Feature>
              <Feature icon={MdGrain} title="Composable">
                Designed with composition in mind. Compose new components with
                ease.
              </Feature>
              <Feature icon={IoMdMoon} title="Light and Dark UI">
                Optimized for multiple color modes. Use light or dark, your
                choice.
              </Feature>
              <Feature icon={AiFillThunderbolt} title="Developer Experience">
                Guaranteed to boost your productivity when building your app or
                website.
              </Feature>
              <Feature icon={FaDiscord} title="Active Community">
                We're a team of active maintainer ready to help you whenver you
                need.
              </Feature>
            </Grid>
          </Container>
        </Box>

        <Divider />

        <Box>
          <Container py="120px">
            <chakra.h1
              textAlign="center"
              fontWeight="bold"
              letterSpacing="tight"
              lineHeight="1.24"
              fontSize="2.75rem"
              mb="48px"
            >
              Loved by product people like you
            </chakra.h1>
            <Grid
              gap="32px"
              templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(3, 1fr)" }}
            >
              {chunk(tweets, 3).map((tweetList, idx) => (
                <Stack spacing="6" key={idx}>
                  {tweetList.map((tweet, idx) => (
                    <TweetCard key={idx} {...tweet} />
                  ))}
                </Stack>
              ))}
            </Grid>
          </Container>
        </Box>

        <Divider />

        <Box bg="gray.50">
          <Container py="120px" maxW="800px" mx="auto" textAlign="center">
            <Flex direction="column" align="center">
              <Center rounded="full" w="100px" h="100px" bg="teal.400">
                <LogoMark w="80%" color="white" />
              </Center>
              <chakra.h1
                textAlign="center"
                fontWeight="bold"
                letterSpacing="tight"
                lineHeight="1.24"
                fontSize="2.75rem"
                mt="6"
                mb="6"
              >
                Get started with Chakra today.
              </chakra.h1>
              <Text mb="40px" fontSize="lg" opacity={0.7}>
                Chakra keeps everyone aligned and working without friction.
                Engineers and designers using the same language.
              </Text>
              <Button
                h="4rem"
                px="40px"
                rounded="12px"
                fontSize="1.2rem"
                as="a"
                size="lg"
                colorScheme="teal"
              >
                {`Get Started ->`}
              </Button>
            </Flex>
          </Container>
        </Box>

        <Divider />

        <Container py="80px">
          <Box maxW="xl" mx="auto">
            <Heading letterSpacing="tight" textAlign="center" mb="2em">
              Code components for your React Apps with speed{" "}
              <Box as="span" color="teal.500">
                using Chakra
              </Box>
              .
            </Heading>
          </Box>

          <Box>
            <LiveProvider
              theme={theme}
              language="jsx"
              scope={{ ...Chakra, ...ReactMdIcons }}
              disabled
              code={sampleCode.trim()}
            >
              <Box display={{ md: "flex" }} alignItems="flex-start">
                <LiveEditor
                  style={{
                    padding: 20,
                    fontFamily: "Menlo,monospace",
                    borderRadius: 10,
                    flex: 2,
                  }}
                />
                <Box boxSize={8} />
                <Box
                  p={6}
                  flex="1"
                  borderRadius="10px"
                  as={LivePreview}
                  borderWidth="1px"
                />
              </Box>
              <Box
                as={LiveError}
                mt={4}
                bg="red.400"
                fontFamily="Menlo, monospace"
                color="white"
                p="1em"
              />
            </LiveProvider>
          </Box>
        </Container>

        <Divider />

        <DiscordStrip />

        <Footer />
      </Box>
    </>
  )
}

export default HomePage
