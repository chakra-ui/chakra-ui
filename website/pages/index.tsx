import {
  Box,
  Button,
  chakra,
  Divider,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/core"
import users from "chakra-users"
import Container from "components/container"
import DiscordStrip from "components/discord-strip"
import { Footer } from "components/footer"
import Header from "components/header"
import SEO from "components/seo"

import fs from "fs"
import NextLink from "next/link"
import path from "path"
import * as React from "react"
import { DiGithubBadge } from "react-icons/di"
import { FaArrowRight } from "react-icons/fa"
import type { Member, Sponsor } from "src/types/github"
import dynamic from "next/dynamic"

const DesignSystem = dynamic(
  () =>
    import(/* webpackChunkName: "design-system" */ "../sections/design-system"),
)
const GetStarted = dynamic(
  () => import(/* webpackChunkName: "get-started" */ "../sections/get-started"),
)
const Growth = dynamic(
  () => import(/* webpackChunkName: "growth" */ "../sections/growth"),
)
const SpeakAtEvents = dynamic(
  () =>
    import(
      /* webpackChunkName: "speak-at-events" */ "../sections/speak-at-events"
    ),
)
const Speed = dynamic(
  () => import(/* webpackChunkName: "speed" */ "../sections/speed"),
)
const Support = dynamic(
  () => import(/* webpackChunkName: "support" */ "../sections/support"),
)
const TrustedBy = dynamic(
  () => import(/* webpackChunkName: "trusted-by" */ "../sections/trusted-by"),
)
const Tweets = dynamic(
  () => import(/* webpackChunkName: "tweets" */ "../sections/tweets"),
)

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
        <Box as="section" pt="12rem" pb="6rem">
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
          </Container>
        </Box>

        <Divider mt={16} />

        <TrustedBy users={users} />

        <Speed />

        <DesignSystem />

        <Growth members={members} />

        <Tweets />

        <Support sponsors={sponsors} />

        <GetStarted />

        <SpeakAtEvents />

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
