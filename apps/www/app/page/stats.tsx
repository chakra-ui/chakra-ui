import { getDiscordMembers } from "@/lib/get-discord-members"
import { getGithubStars } from "@/lib/get-github-stars"
import { getNpmDownloads } from "@/lib/get-npm-downloads"
import {
  Circle,
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
import { BlitzIcon } from ".//icons"

const Intro = () => (
  <Stack gap={{ base: "6", md: "14" }} align="center">
    <Heading
      maxW="md"
      textStyle={{ base: "3xl", md: "5xl" }}
      fontWeight="bold"
      textAlign="center"
    >
      Built for developers By{" "}
      <Span
        color="teal.500"
        pos="relative"
        px="2"
        display="inline-block"
        _before={{
          pos: "absolute",
          content: "''",
          w: "full",
          h: "full",
          bg: "teal.500/10",
          bottom: "-3px",
          left: "0",
          borderRight: "solid 1.5px",
          borderColor: "currentColor",
        }}
      >
        developers
      </Span>
    </Heading>

    <Stack
      textStyle={{ base: "lg", md: "2xl" }}
      fontWeight="medium"
      textAlign="center"
    >
      <Heading>Built for modern product teams.</Heading>
      <Text color="gray.400">
        From next-gen startups to established enterprises.
      </Text>
    </Stack>
  </Stack>
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
      border="1px solid #001B18"
      ml="-1px"
      align="center"
      gap={{ base: "4", md: "8" }}
      pt={{ base: "5", md: "10" }}
      pb={{ base: "4", md: "8" }}
    >
      <Text
        fontWeight="medium"
        color="teal.500"
        textStyle={{ base: "4xl", md: "7xl" }}
      >
        {description}
      </Text>
      <Flex align="center" gap="3">
        <Icon color="teal.500">
          <StatIcon />
        </Icon>
        <Text color="gray.400" fontWeight="medium">
          {title}
        </Text>
      </Flex>
    </Stack>
  )
}

async function getStats() {
  const [
    { prettyCount: githubStars },
    { prettyCount: npmDownloads },
    { prettyCount: discordMembers },
  ] = await Promise.all([
    getGithubStars(),
    getNpmDownloads(),
    getDiscordMembers(),
  ])

  return {
    githubStars,
    discordMembers,
    npmDownloads,
  }
}

const StatsList = async () => {
  const { githubStars, discordMembers, npmDownloads } = await getStats()

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

export const Stats = async () => {
  return (
    <Container>
      <Stack
        gap={{ base: "10", md: "20" }}
        pos="relative"
        align="center"
        maxW="100%"
      >
        <Icon
          asChild
          w="245px"
          h="342px"
          pos="absolute"
          top="-28"
          right="67px"
          mdDown={{ display: "none" }}
        >
          <BlitzIcon />
        </Icon>
        <Intro />
        <StatsList />

        <Circle
          w="765px"
          h="765px"
          rounded="100%"
          opacity="0.15"
          filter="blur(250px)"
          bg="teal.500"
          pos="absolute"
          right="-32"
          bottom="-50%"
          mdDown={{ display: "none" }}
        />
      </Stack>
    </Container>
  )
}
