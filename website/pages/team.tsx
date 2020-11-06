import {
  Avatar,
  Box,
  chakra,
  Heading,
  Icon,
  Link,
  SimpleGrid,
  Stack,
  Text,
  Wrap,
  WrapItem,
} from "@chakra-ui/core"
import { SkipNavContent, SkipNavLink } from "@chakra-ui/skip-nav"
import Container from "components/container"
import Header from "components/header"
import PageTransition from "components/page-transition"
import SEO from "components/seo"
import fs from "fs"
import path from "path"
import * as React from "react"
import { IoIosGlobe, IoLogoGithub, IoLogoTwitter } from "react-icons/io"
import { Contributor, Member as IMember } from "src/types/github"

function SocialLink({ icon, href }) {
  return (
    <Link
      display="inline-flex"
      alignItems="center"
      justifyContent="center"
      rounded="full"
      href={href}
      isExternal
    >
      <Icon
        as={icon}
        transition="all 0.2s"
        _hover={{ color: "teal.600" }}
        fontSize="xl"
        color="teal.500"
      />
    </Link>
  )
}

function Member({ member }: { member: IMember }) {
  const {
    avatar_url: avatarUrl,
    bio,
    name,
    twitter_username: twitterUsername,
    blog: websiteUrl,
    url,
  } = member

  return (
    <Box>
      <Stack direction="row" spacing={6}>
        <Avatar size="xl" src={avatarUrl} />
        <Stack spacing={3} maxW="320px">
          <Text fontWeight="bold" fontSize="md">
            {name}
          </Text>

          <Stack isInline align="center" spacing={2}>
            <SocialLink href={url} icon={IoLogoGithub} />
            {twitterUsername && (
              <SocialLink
                href={`https://twitter.com/${twitterUsername}`}
                icon={IoLogoTwitter}
              />
            )}
            {websiteUrl && <SocialLink href={websiteUrl} icon={IoIosGlobe} />}
          </Stack>
          <Text>{bio}</Text>
        </Stack>
      </Stack>
    </Box>
  )
}

interface TeamProps {
  members: IMember[]
  contributors: Contributor[]
}

function Team({ members, contributors }: TeamProps) {
  const memberLogins = members.map(({ login }) => login)
  const contributorsWithoutTeam = contributors.filter(
    ({ login }) => !memberLogins.includes(login),
  )

  return (
    <>
      <SEO
        title="Chakra UI Team and Contributors"
        description="List of team members and contributors that make the Chakra UI project possible"
      />
      <SkipNavLink zIndex={20}>Skip to Content</SkipNavLink>
      <Header />

      <Box mt={{ base: "60px", md: "120px" }} mb="60px">
        <SkipNavContent />
        <PageTransition>
          <Container py="80px" textAlign="center">
            <chakra.h1
              color="teal.400"
              textStyle="heading"
              mb="5"
              fontWeight="bold"
            >
              Chakra UI Team
            </chakra.h1>
            <Text maxW="56ch" mx="auto" fontSize="lg">
              Amazing engineers who have contributed time, effort, and thought
              to Chakra UI. Without them, this project would not be possible.
            </Text>
          </Container>

          <Container>
            <Stack spacing={8}>
              <Heading size="lg">Core Team 🤝</Heading>
              <SimpleGrid columns={[1, 1, 2]} spacing="40px" pt="3">
                {members.map((member) => (
                  <Member key={member.login} member={member} />
                ))}
              </SimpleGrid>
            </Stack>

            <Stack py="48px" spacing={8}>
              <Heading size="lg">Our Sponsors 💰</Heading>

              <Box>
                <Text
                  textStyle="caps"
                  mb="4"
                  textTransform="uppercase"
                  opacity="0.7"
                >
                  Organizations
                </Text>
                <Wrap>
                  {new Array(9).fill("").map((_, idx) => (
                    <WrapItem
                      as="a"
                      key={idx}
                      href={`https://opencollective.com/chakra-ui/organization/${idx}/website`}
                    >
                      <img
                        src={`https://opencollective.com/chakra-ui/organization/${idx}/avatar.svg?avatarHeight=130`}
                      />
                    </WrapItem>
                  ))}
                </Wrap>
              </Box>
              <Box>
                <Text
                  textStyle="caps"
                  mb="4"
                  textTransform="uppercase"
                  opacity="0.7"
                >
                  Individuals
                </Text>
                <a href="https://opencollective.com/chakra-ui">
                  <img src="https://opencollective.com/chakra-ui/individuals.svg?width=890" />
                </a>
              </Box>
            </Stack>

            <Stack spacing={8} mt={{ base: "40px", md: "100px" }}>
              <Heading size="lg">Project Contributors 💖</Heading>
              <Wrap spacing="3">
                {contributorsWithoutTeam.map((contributor) => (
                  <WrapItem
                    as={Avatar}
                    key={contributor.login}
                    src={contributor.avatar_url}
                  />
                ))}
              </Wrap>
            </Stack>
          </Container>
        </PageTransition>
      </Box>
    </>
  )
}

const sortMembers = (a, b) => {
  // segun comes first!
  if (a.login === "segunadebayo") return -1
  if (b.login === "segunadebayo") return 1

  // everything else is alphabetical by login
  return a.login.localeCompare(b.login, "en")
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
  const filters = ["christiannwamba"]

  return {
    props: {
      members: members.filter((m) => !filters.includes(m.login)),
      contributors,
    },
  }
}

export default Team
