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
  LightMode,
  SimpleGrid,
  Stack,
  Text,
  useColorModeValue,
  Wrap,
  WrapItem,
} from "@chakra-ui/react"
import { chunk } from "@chakra-ui/utils"
import users from "chakra-users"
import Container from "components/container"
import DiscordStrip from "components/discord-strip"
import { Footer } from "components/footer"
import Header from "components/header"
import LogoMark from "components/logo-mark"
import SEO from "components/seo"
import TweetCard from "components/tweet-card"
import { tweets } from "configs/tweets.json"
import fs from "fs"
import NextLink from "next/link"
import path from "path"
import * as React from "react"
import { AiFillThunderbolt } from "react-icons/ai"
import { DiGithubBadge } from "react-icons/di"
import { FaArrowRight, FaDiscord, FaMicrophone } from "react-icons/fa"
import { FiDownload, FiGithub, FiUsers } from "react-icons/fi"
import { IoMdMoon } from "react-icons/io"
import { MdAccessibility, MdGrain, MdPalette } from "react-icons/md"
import type { Member, Sponsor } from "src/types/github"

const Feature = ({ title, icon, children, ...props }) => {
  return (
    <Box
      bg={useColorModeValue("white", "gray.700")}
      rounded="12px"
      shadow="base"
      p="40px"
      {...props}
    >
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
      <Heading as="h3" size="md" fontWeight="semibold" mt="1em" mb="0.5em">
        {title}
      </Heading>
      <Text fontSize="lg" opacity={0.7}>
        {children}
      </Text>
    </Box>
  )
}

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

interface HomePageProps {
  members: Member[]
  sponsors: {
    companies: Sponsor[]
    individuals: Sponsor[]
  }
}

const HomePage = ({ members, sponsors }: HomePageProps) => {
  return (
    <>
      <SEO
        title="Chakra UI - A simple, modular and accessible component library that gives you the building blocks you need to build your React applications."
        description="Simple, Modular and Accessible UI Components for your React Applications. Built with Styled System"
      />
      <Header />

      <Box mb={20}>
        <Box
          as="section"
          pt={{ base: "10rem", md: "12rem" }}
          pb={{ base: "0", md: "5rem" }}
        >
          <Container>
            <Box maxW="760px" mx="auto" textAlign="center">
              <chakra.h1
                fontSize={{ base: "2.25rem", sm: "3rem", lg: "3.75rem" }}
                letterSpacing="tight"
                fontWeight="bold"
                mb="16px"
                lineHeight="1.2"
              >
                Build accessible React apps
                <Box
                  as="span"
                  color={useColorModeValue("teal.500", "teal.300")}
                >
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

            <Center>
              <Box
                display="inline-block"
                mt="70px"
                rounded="xl"
                bg="green.50"
                shadow="base"
                px="6"
                py="4"
              >
                <Img h="72px" src="/git-nation-badge.png" />
              </Box>
            </Center>
          </Container>
        </Box>

        <Divider />

        <Box as="section" pt="48px" pb="32px">
          <Container textAlign="center">
            <chakra.p
              fontWeight="500"
              textStyle="caps"
              color={useColorModeValue("teal.600", "teal.300")}
              mb="48px"
            >
              Trusted in Production By
            </chakra.p>
            <Wrap
              maxW="800px"
              mx="auto"
              justify="center"
              align="center"
              spacing="24px"
            >
              {users
                .filter((user) => user.image.includes("."))
                .map((user) => (
                  <WrapItem key={user.name} bg="white" p="5" rounded="md">
                    <chakra.img
                      key={user.image}
                      alt={user.name}
                      h="24px"
                      w="auto"
                      src={user.image}
                      loading="lazy"
                    />
                  </WrapItem>
                ))}
              <Box
                p="4"
                border="1px dashed"
                borderColor={useColorModeValue("teal.200", "teal.500")}
                bg={useColorModeValue("teal.50", "whiteAlpha.200")}
                rounded="md"
              >
                <Box as="span" mr="1" role="img">
                  💖
                </Box>{" "}
                Your company
              </Box>
            </Wrap>
          </Container>
        </Box>

        <Box as="section">
          <Container py="80px">
            <Box mb="3em" textAlign="center">
              <chakra.h2 textStyle="heading">Less code. More speed</chakra.h2>
              <Text opacity={0.7} fontSize="lg" mt="3" mx="auto" maxW="600px">
                Spend less time writing UI code and more time building a great
                experience for your customers.
              </Text>
            </Box>
            <Box
              maxW="7xl"
              mx="auto"
              mb="-300px"
              px={{ base: "4", md: 0 }}
              position="relative"
            >
              <Box
                as="iframe"
                tabIndex={-1}
                src="https://codesandbox.io/embed/homepage-s7pkh?codemirror=1&fontsize=12&hidenavigation=1&theme=dark"
                style={{
                  width: "100%",
                  background: "white",
                  height: "600px",
                  border: "0",
                  borderRadius: 8,
                  overflow: "hidden",
                  position: "static",
                  zIndex: 0,
                }}
                shadow="2xl"
                title="Chakra Playground"
                allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
                sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
              />
            </Box>
          </Container>
        </Box>

        <Box
          as="section"
          pt="240px"
          bg={useColorModeValue("gray.50", "gray.900")}
        >
          <Container py="120px" maxW="1280px">
            <Box maxW="760px" mx="auto" textAlign="center" mb="56px">
              <chakra.h2 textStyle="heading" mb="5">
                An experience you'd expect from a design system
              </chakra.h2>
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
                We're a team of active maintainers ready to help you whenever
                you need.
              </Feature>
            </Grid>
          </Container>
        </Box>

        <Box as="section" bg="teal.500">
          <Container py="7.5rem" maxW="1280px" color="white">
            <Box maxW="760px" mx="auto" textAlign="center" mb="56px">
              <chakra.h2 textStyle="heading" mb="5">
                Chakra is growing quickly
              </chakra.h2>
              <chakra.p opacity={0.7} fontSize="lg">
                We're dedicated to improving the experience and performance of
                Chakra UI.
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
                title="200k"
                description="Downloads per month"
              />
              <StatBox
                icon={FiGithub}
                title="11.6k"
                description="Github stars"
              />
              <StatBox
                icon={FiUsers}
                title="7"
                description="Core contributors"
              />
              <StatBox
                icon={FaDiscord}
                title="900+"
                description="Discord members"
              />
            </SimpleGrid>

            <Box mt="5rem" textAlign="center">
              <chakra.p mb="48px" textStyle="caps">
                Chakra Heroes 🥇
              </chakra.p>
              <Wrap spacing="4" justify="center" maxW="660px" mx="auto">
                {members.map((i) => (
                  <WrapItem
                    as={Img}
                    key={i.login}
                    width="80px"
                    height="80px"
                    rounded="full"
                    alt={i.name}
                    src={i.avatar_url}
                    loading="lazy"
                  />
                ))}
              </Wrap>
            </Box>
          </Container>
        </Box>

        <Box>
          <Container py="120px" maxW="1200px" px="32px">
            <chakra.h2 textStyle="heading-2" mb="48px">
              Loved by product people like you
            </chakra.h2>
            <SimpleGrid spacing="32px" columns={{ base: 1, md: 3 }}>
              {chunk(tweets, 3).map((tweetList, idx) => (
                <Stack spacing="6" key={idx}>
                  {tweetList.map((tweet: any, idx) => (
                    <TweetCard key={idx} {...tweet} />
                  ))}
                </Stack>
              ))}
            </SimpleGrid>
          </Container>
        </Box>

        <Box bg="teal.500">
          <Container py="120px" maxW="1200px" px="32px" color="white">
            <Box maxW="560px" mx="auto" textAlign="center" mb="56px">
              <chakra.h2 textStyle="heading-2" mb="4">
                Support Chakra UI 💖
              </chakra.h2>
              <Text fontSize="lg" opacity={0.7}>
                Our maintainers devote their time, effort, and heart to ensure
                Chakra UI keeps getting better. Support us by donating to our
                collective 🙏
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
              <LightMode>
                <Button
                  w={{ base: "100%", md: "auto" }}
                  alignSelf="center"
                  as="a"
                  minW="7rem"
                  colorScheme="teal"
                  href="https://opencollective.com/chakra-ui"
                  rel="noopener"
                  target="_blank"
                >
                  Sponsor
                </Button>
              </LightMode>
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
              <LightMode>
                <Button
                  w={{ base: "100%", md: "auto" }}
                  alignSelf="center"
                  as="a"
                  minW="7rem"
                  colorScheme="teal"
                  href="https://www.patreon.com/segunadebayo"
                  rel="noopener"
                  target="_blank"
                >
                  Sponsor
                </Button>
              </LightMode>
            </Stack>

            <Box maxW="600px" mx="auto" textAlign="center">
              <chakra.p textStyle="caps" mb="8" mt="4rem">
                Organization Sponsors 🏦
              </chakra.p>
              <Wrap justify="center">
                {sponsors.companies.map((i) => (
                  <WrapItem key={i.MemberId}>
                    <Circle
                      as="a"
                      href={i.website}
                      target="_blank"
                      rel="noopener"
                      size="80px"
                      bg="white"
                      shadow="lg"
                    >
                      <Img
                        rounded="full"
                        w="56px"
                        h="56px"
                        alt={i.name}
                        key={i.MemberId}
                        src={i.image}
                        loading="lazy"
                      />
                    </Circle>
                  </WrapItem>
                ))}
              </Wrap>

              <chakra.p mb="8" mt="4rem" textStyle="caps">
                Individual Sponsors 🥇
              </chakra.p>
              <Wrap justify="center">
                {sponsors.individuals.map((i) => (
                  <WrapItem
                    as={Img}
                    rounded="full"
                    w="40px"
                    h="40px"
                    objectFit="cover"
                    alt={i.name}
                    key={i.MemberId}
                    src={i.image}
                    loading="lazy"
                  />
                ))}
              </Wrap>
            </Box>
          </Container>
        </Box>

        <Box>
          <Container py="120px" maxW="800px" mx="auto" textAlign="center">
            <Flex direction="column" align="center">
              <Center rounded="full" w="100px" h="100px" bg="teal.400">
                <LogoMark w="80%" color="white" />
              </Center>
              <Box maxW="600px" mx="auto">
                <chakra.h2 textStyle="heading-2" mt="6" mb="6">
                  Get started with Chakra today
                </chakra.h2>
                <Text mb="40px" fontSize="lg" opacity={0.7}>
                  Chakra keeps everyone aligned and working without friction.
                  Engineers and designers using the same language.
                </Text>
              </Box>
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
            </Flex>
          </Container>
        </Box>

        <Box
          bg={useColorModeValue("teal.50", "#81e6d91c")}
          bgImage="url(/audio-bar.svg)"
          bgPos="bottom center"
          bgSize="120px"
          bgRepeat="repeat no-repeat"
        >
          <Container
            pt="7.5rem"
            pb="10rem"
            maxW="50rem"
            mx="auto"
            textAlign="center"
          >
            <Flex direction="column" align="center" maxW="600px" mx="auto">
              <Circle size="80px" bg="blackAlpha.200">
                <FaMicrophone size="40px" />
              </Circle>
              <chakra.h2 textStyle="heading" mt="6" mb="6">
                Invite us to speak at your next event
              </chakra.h2>
              <Text mb="40px" fontSize="lg" opacity={0.7}>
                Want a Chakra UI core team member to speak at your next event?
                Invite us to create a memorable and engaging experience for your
                attendees.
              </Text>
            </Flex>
            <Button
              h="4rem"
              px="40px"
              fontSize="1.2rem"
              as="a"
              href="mailto:sage@adebayosegun.com?subject=Invitation to Speak!"
              size="lg"
              colorScheme="teal"
              rightIcon={<FaArrowRight fontSize="0.8em" />}
            >
              Invite us to speak
            </Button>
          </Container>
        </Box>

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

  /**
   * Read the information for each sponsor from `.all-sponsorsrc` file
   */
  const sponsorsRcPath = path.resolve("..", ".all-sponsorsrc")
  const sponsors = JSON.parse(fs.readFileSync(sponsorsRcPath, "utf-8"))
  const filters = ["christiannwamba"]

  return {
    props: {
      members: members.filter((m) => !filters.includes(m.login)),
      contributors,
      sponsors,
    },
  }
}

export default HomePage
