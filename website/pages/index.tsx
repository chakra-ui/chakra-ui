import * as Chakra from "@chakra-ui/core"
import {
  Box,
  BoxProps,
  Button,
  Center,
  chakra,
  Circle,
  Divider,
  Flex,
  Grid,
  Heading,
  Icon,
  Img,
  SimpleGrid,
  Stack,
  Text,
  TextProps,
  Wrap,
} from "@chakra-ui/core"
import { chunk } from "@chakra-ui/utils"
import users from "chakra-users"
import Container from "components/container"
import DiscordStrip from "components/discord-strip"
import { Footer } from "components/footer"
import Header from "components/header"
import LogoMark from "components/logo-mark"
import SEO from "components/seo"
import TweetCard from "components/tweet-card"
import tweets from "configs/tweets"
import fs from "fs"
import NextLink from "next/link"
import path from "path"
import theme from "prism-react-renderer/themes/nightOwl"
import * as React from "react"
import { AiFillThunderbolt } from "react-icons/ai"
import { DiGithubBadge } from "react-icons/di"
import { FaArrowRight, FaDiscord } from "react-icons/fa"
import { FiDownload, FiGithub, FiUsers } from "react-icons/fi"
import { IoMdMoon } from "react-icons/io"
import * as ReactMdIcons from "react-icons/md"
import { MdAccessibility, MdGrain, MdPalette } from "react-icons/md"
import { LiveEditor, LiveError, LivePreview, LiveProvider } from "react-live"

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

type StatBoxProps = BoxProps & {
  icon?: React.ElementType
  title: string
  description: string
}

const StatBox = (props: StatBoxProps) => {
  const { icon: StatIcon, title, description, ...rest } = props
  return (
    <Flex
      direction="column"
      align={{ base: "center", md: "flex-start" }}
      pl={{ base: 0, md: "8" }}
      borderLeft="2px solid"
      borderLeftColor="yellow.200"
      {...rest}
    >
      <Box
        fontSize={{ base: "4rem", md: "6.75rem" }}
        lineHeight="1em"
        mb="20px"
      >
        {title}
      </Box>
      <Stack isInline align="center">
        <StatIcon size="24px" />
        <Text>{description}</Text>
      </Stack>
    </Flex>
  )
}

const AllCapsText = (props: TextProps) => (
  <Text
    textTransform="uppercase"
    fontSize="sm"
    letterSpacing="widest"
    fontWeight="bold"
    {...props}
  />
)

const HomePage = ({ members, sponsors }) => {
  return (
    <>
      <SEO
        title="Chakra UI - A simple, modular and accessible component library that gives you the building blocks you need to build your React applications."
        description="Simple, Modular and Accessible UI Components for your React Applications. Built with Styled System"
      />
      <Header />
      <Box mb={20}>
        <Box as="section" pt="12rem" pb="6rem">
          <Container>
            <Box maxW="760px" mx="auto" textAlign="center">
              <chakra.h1
                fontSize={{ base: "2.25rem", md: "3rem", lg: "3.75rem" }}
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

              <Text opacity={0.7} fontSize={{ base: "lg", lg: "xl" }} mt="6">
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
                    fontSize="1.2rem"
                    as="a"
                    size="lg"
                    colorScheme="teal"
                    rightIcon={<FaArrowRight fontSize="0.8em" />}
                  >
                    Get Started
                  </Button>
                </NextLink>
                <Button
                  as="a"
                  size="lg"
                  h="4rem"
                  px="40px"
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
            <AllCapsText color="teal.500" mb="48px">
              Trusted in Production By
            </AllCapsText>
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
                  return (
                    <chakra.img
                      key={user.image}
                      h="24px"
                      w="auto"
                      src={user.image}
                    />
                  )
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
          <Container py="120px" maxW="1280px">
            <Box maxW="760px" mx="auto" textAlign="center" mb="56px">
              <chakra.h1
                fontWeight="bold"
                letterSpacing="tight"
                lineHeight="1.24"
                fontSize={{ base: "2.75rem", md: "3.5rem" }}
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

        <Box as="section" bg="teal.500">
          <Container py="7.5rem" maxW="1280px" color="white">
            <Box maxW="760px" mx="auto" textAlign="center" mb="56px">
              <chakra.h1
                fontWeight="bold"
                letterSpacing="tight"
                lineHeight="1.24"
                fontSize={{ base: "2.75rem", md: "3.5rem" }}
                mb="5"
              >
                Chakra is growing quickly
              </chakra.h1>
              <chakra.p opacity={0.7} fontSize="lg">
                We're dedicated to improving the experience and performance of
                Chakra UI
              </chakra.p>
            </Box>
            <SimpleGrid
              columns={{ base: 1, md: 2 }}
              maxW="880px"
              mx="auto"
              spacing="4rem"
              px={{ md: 12 }}
            >
              <StatBox
                icon={FiDownload}
                title="140k"
                description="Downloads per month"
              />
              <StatBox
                icon={FiGithub}
                title="9.9k"
                description="Github stars"
              />
              <StatBox
                icon={FiUsers}
                title="6"
                description="Core contributors"
              />
              <StatBox
                icon={FaDiscord}
                title="450+"
                description="Discord members"
              />
            </SimpleGrid>

            <Box mt="5rem" textAlign="center">
              <AllCapsText mb="48px">Chakra Heros 🥇</AllCapsText>
              <Wrap spacing="4" justify="center" maxW="660px" mx="auto">
                {members.map((i) => (
                  <Img
                    key={i.login}
                    htmlWidth="80px"
                    rounded="full"
                    src={i.avatar_url}
                  />
                ))}
              </Wrap>
            </Box>
          </Container>
        </Box>

        <Divider />

        <Box>
          <Container py="120px" maxW="1200px" px="32px">
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

        <Box bg="teal.500">
          <Container py="120px" maxW="1200px" px="32px" color="white">
            <Box maxW="560px" mx="auto" textAlign="center" mb="56px">
              <chakra.h1
                textAlign="center"
                fontWeight="bold"
                letterSpacing="tight"
                fontSize="2.75rem"
                mb="4"
              >
                Support Chakra UI 💖
              </chakra.h1>
              <Text opacity={0.7} lineHeight="taller">
                Our maintainers devote their time, effort, and heart to ensure
                Chakra UI keeps getting better. Show some love By donating to
                our collective 🙏
              </Text>
            </Box>

            <Stack
              direction={{ base: "column", md: "row" }}
              spacing="6"
              maxW="600px"
              mx="auto"
              bg="white"
              color="gray.800"
              shadow="md"
              rounded="lg"
              p="6"
            >
              <Stack flex="1" isInline spacing="6" pr={{ base: 0, md: "4" }}>
                <Icon h="40px" w="40px" viewBox="0 0 32 32">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M29.1531 6.8877C30.948 9.47379 31.9999 12.614 31.9999 16.0003C31.9999 19.3866 30.948 22.5271 29.1531 25.1129L25.0085 20.9684C25.8225 19.4957 26.2858 17.8019 26.2858 16.0003C26.2858 14.1987 25.8225 12.5052 25.0085 11.0325L29.1531 6.8877Z"
                    fill="#8FC7FF"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M25.1126 2.84685L20.9678 6.99138C19.4951 6.17745 17.8016 5.71417 16 5.71417C10.3194 5.71417 5.71418 10.3194 5.71418 16C5.71418 21.6806 10.3194 26.2858 16 26.2858C17.8016 26.2858 19.4951 25.8226 20.9678 25.0086L25.1126 29.1532C22.5265 30.948 19.3863 32 16 32C7.16352 32 0 24.8365 0 16C0 7.16351 7.16352 0 16 0C19.3863 0 22.5265 1.05197 25.1126 2.84685Z"
                    fill="#297EFF"
                  />
                </Icon>
                <Box flex="1">
                  <Text fontSize="lg" fontWeight="bold" mt="-1">
                    Open Collective
                  </Text>
                  <Text opacity={0.7}>Sponsor the Chakra UI maintainers</Text>
                </Box>
              </Stack>
              <Button
                w={{ base: "100%", md: "auto" }}
                alignSelf="center"
                as="a"
                minW="7rem"
                colorScheme="teal"
                href="https://opencollective.com/chakra-ui"
                target="_blank"
              >
                Sponsor
              </Button>
            </Stack>

            <Stack
              direction={{ base: "column", md: "row" }}
              maxW="600px"
              mt="6"
              mx="auto"
              bg="white"
              color="gray.800"
              shadow="md"
              rounded="lg"
              p="6"
            >
              <Stack flex="1" isInline spacing="6" pr={{ base: 0, md: "4" }}>
                <Icon w="40px" h="40px" viewBox="0 0 569 546">
                  <g>
                    <circle
                      cx="362.589996"
                      cy="204.589996"
                      r="204.589996"
                      fill="#f96854"
                    />
                    <rect
                      fill="#052d49"
                      height="545.799988"
                      width="100"
                      x="0"
                      y="0"
                    />
                  </g>
                </Icon>
                <Box flex="1">
                  <Text fontSize="lg" fontWeight="bold" mt="-1">
                    Patreon
                  </Text>
                  <Text opacity={0.7}>Sponsor the creator, Segun Adebayo</Text>
                </Box>
              </Stack>
              <Button
                w={{ base: "100%", md: "auto" }}
                alignSelf="center"
                as="a"
                minW="7rem"
                colorScheme="teal"
                href="https://www.patreon.com/segunadebayo"
                target="_blank"
              >
                Sponsor
              </Button>
            </Stack>

            <Box maxW="600px" mx="auto" textAlign="center">
              <AllCapsText mb="8" mt="4rem">
                Organization Sponsors 🏦
              </AllCapsText>
              <Wrap justify="center">
                {sponsors.company.map((i) => (
                  <Circle
                    as="a"
                    href={i.website}
                    target="_blank"
                    size="80px"
                    bg="white"
                    shadow="lg"
                  >
                    <Img
                      rounded="full"
                      w="56px"
                      h="56px"
                      key={i.MemberId}
                      src={i.image}
                    />
                  </Circle>
                ))}
              </Wrap>

              <AllCapsText mb="8" mt="4rem">
                Individual Sponsors 🥇
              </AllCapsText>
              <Wrap justify="center">
                {sponsors.individual.map((i) => (
                  <Img
                    rounded="full"
                    w="40px"
                    h="40px"
                    objectFit="cover"
                    key={i.MemberId}
                    src={i.image}
                  />
                ))}
              </Wrap>
            </Box>
          </Container>
        </Box>

        <Box bg="gray.50">
          <Container py="120px" maxW="800px" mx="auto" textAlign="center">
            <Flex direction="column" align="center">
              <Center rounded="full" w="100px" h="100px" bg="teal.400">
                <LogoMark w="80%" color="white" />
              </Center>
              <Box maxW="600px" mx="Auto">
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
              </Box>
              <Button
                h="4rem"
                px="40px"
                fontSize="1.2rem"
                as="a"
                size="lg"
                colorScheme="teal"
                rightIcon={<FaArrowRight fontSize="0.8em" />}
              >
                Get Started
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

export async function getStaticProps() {
  /**
   * Read the profile/bio of each member from `.all-membersrc` file
   * to avoid overfetching from Github
   */
  const membersRcPath = path.resolve("..", ".all-membersrc")
  const { members } = JSON.parse(fs.readFileSync(membersRcPath, "utf-8"))

  /**
   * Read contributors from `.all-contributorsrc` file
   * to avoid overfetching from Github
   */
  const contributorsRcPath = path.resolve("..", ".all-contributorsrc")
  const { contributors } = JSON.parse(
    fs.readFileSync(contributorsRcPath, "utf-8"),
  )

  const res = await fetch(
    "https://opencollective.com/chakra-ui/members/all.json",
  )
  const sponsors = await res.json()
  const individualSponsors = sponsors.filter(
    (i) => i.type === "USER" && i.image != null,
  )
  const companySponsors = sponsors.filter((i) => i.type === "ORGANIZATION")

  return {
    props: {
      members,
      contributors,
      sponsors: {
        individual: individualSponsors,
        company: companySponsors,
      },
    },
  }
}

export default HomePage
