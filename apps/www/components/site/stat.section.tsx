import { getDiscordMembers } from "@/lib/get-discord-members"
import { getGithubStars } from "@/lib/get-github-stars"
import { getNpmDownloads } from "@/lib/get-npm-downloads"
import {
  Box,
  Container,
  Flex,
  Heading,
  Icon,
  Span,
  Stack,
  Text,
} from "@chakra-ui/react"
import { BsGithub } from "react-icons/bs"
import { FaDiscord } from "react-icons/fa"
import { IconType } from "react-icons/lib"
import { RiNpmjsFill } from "react-icons/ri"
import { Blob } from "./blob"
import { BlitzIcon } from "./icons"
import { HighlightHeading } from "./typography"

const BlitzIconSection = () => (
  <Icon
    asChild
    w="245px"
    h="342px"
    pos="absolute"
    top="-28"
    right="67px"
    color="fg.inverted"
    hideBelow="md"
  >
    <BlitzIcon />
  </Icon>
)

interface StatBoxProps {
  icon: IconType
  title: string
  description: string
}

const StatsBox = (props: StatBoxProps) => {
  const { icon: StatIcon, title, description } = props

  return (
    <Stack
      flex="1"
      ms="-1px"
      borderWidth="1px"
      borderColor={{ _light: "border", _dark: "#001B18" }}
      align="center"
      gap={{ base: "3", md: "6" }}
      pt={{ base: "5", md: "10" }}
      pb={{ base: "4", md: "8" }}
    >
      <Text
        fontWeight="medium"
        color={{ _light: "teal.600", _dark: "teal.500" }}
        textStyle={{ base: "4xl", md: "7xl" }}
      >
        {description}
      </Text>
      <Flex align="center" gap="3">
        <Icon color={{ _light: "teal.600", _dark: "teal.500" }}>
          <StatIcon />
        </Icon>
        <Text color="fg.muted" fontWeight="medium">
          {title}
        </Text>
      </Flex>
    </Stack>
  )
}

const KeyStats = async () => {
  const [
    { prettyCount: githubStars },
    { prettyCount: npmDownloads },
    { prettyCount: discordMembers },
  ] = await Promise.all([
    getGithubStars(),
    getNpmDownloads(),
    getDiscordMembers(),
  ])

  return (
    <Flex
      w="full"
      maxW="6xl"
      pos="relative"
      direction={{ base: "column", md: "row" }}
    >
      <StatsBox
        icon={RiNpmjsFill}
        title="downloads  / month"
        description={npmDownloads}
      />
      <StatsBox
        icon={BsGithub}
        title="github stars"
        description={githubStars}
      />
      <StatsBox
        icon={FaDiscord}
        title="discord members"
        description={discordMembers}
      />
    </Flex>
  )
}

export const StatSection = async () => {
  return (
    <Box as="section" py="20">
      <Container>
        <Stack
          gap={{ base: "10", md: "20" }}
          pos="relative"
          align="center"
          maxW="100%"
        >
          <BlitzIconSection />
          <Stack gap={{ base: "6", md: "14" }} align="center">
            <HighlightHeading
              query="By developers"
              as="h2"
              maxW="500px"
              textAlign="center"
            >
              Built for developers By developers
            </HighlightHeading>
            <Heading textAlign="center" fontWeight="medium">
              Built for modern product teams.
              <br />
              <Span color="fg.muted">
                From next-gen startups to established enterprises.
              </Span>
            </Heading>
          </Stack>
          <KeyStats />
        </Stack>

        <Blob width="765px" height="765px" right="-32" bottom="-50%" />
      </Container>
    </Box>
  )
}
