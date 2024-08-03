import { BlitzFillIcon, OpenCollective, Patreon } from "@/app/page/icons"
import {
  CompanySponsor,
  IndividualSponsor,
  getAllSponsors,
} from "@/lib/get-all-sponsors"
import {
  Button,
  Center,
  Circle,
  Container,
  Flex,
  Grid,
  Group,
  HStack,
  Heading,
  Icon,
  Image,
  Span,
  Stack,
  Text,
  Wrap,
} from "@chakra-ui/react"
import { FaShieldHeart } from "react-icons/fa6"
import { GiGoldBar } from "react-icons/gi"
import { PiMedalFill } from "react-icons/pi"
import { RiMedalFill } from "react-icons/ri"

const Intro = () => (
  <Stack gap="6">
    <HStack gap="4" color="teal.500">
      <BlitzFillIcon />
      <Text fontWeight="bold">Sponsors</Text>
    </HStack>
    <Heading maxW="md" size="5xl" fontWeight="bold">
      Built for developers By{" "}
      <Span color="teal.500" px="2">
        developers
      </Span>
    </Heading>
  </Stack>
)

const SponsorLinks = () => (
  <Group gap="5">
    <Button asChild colorPalette="teal" size="lg" bg="teal.500" color="black">
      <a
        target="_blank"
        rel="noopener"
        href="https://opencollective.com/chakra-ui"
      >
        <Icon asChild>
          <OpenCollective />
        </Icon>
        Sponsor
      </a>
    </Button>
    <Button
      asChild
      colorPalette="teal"
      size="lg"
      variant="outline"
      color="teal.500!"
    >
      <a
        target="_blank"
        rel="noopener"
        href="https://www.patreon.com/segunadebayo"
      >
        <Icon asChild>
          <Patreon />
        </Icon>
        Patreon
      </a>
    </Button>
  </Group>
)

const Description = () => (
  <Stack gap="6">
    <Text textStyle="2xl" maxW="xl">
      Our maintainers devote their time, effort, and heart to ensure Chakra UI
      keeps getting better.
      <br />
      <Span color="gray.400">Support us by donating to our collective 🙏</Span>
    </Text>
    <SponsorLinks />
  </Stack>
)

const SponsorGroup = (props: {
  sponsors: (CompanySponsor | IndividualSponsor)[]
}) => (
  <Wrap
    gap="0"
    zIndex="5"
    css={{
      "& > *": {
        "--border-width": "0.5px",
        border: "solid var(--border-width)",
        borderColor: "#001B18",
        mr: "calc(var(--border-width) * -1)",
        mb: "calc(var(--border-width) * -1)",
        py: "4",
      },
    }}
  >
    {props.sponsors.map((sponsor) => {
      return (
        <Center asChild key={sponsor.MemberId} px="4">
          <a
            href={sponsor.website ?? sponsor.profile}
            target="_blank"
            rel="noopener"
          >
            <Image
              src={sponsor.image}
              alt={sponsor.name}
              w="6"
              h="6"
              rounded="md"
              opacity={{ base: "0.7", _hover: "1" }}
              transition="opacity 0.2s"
            />
          </a>
        </Center>
      )
    })}
  </Wrap>
)

const METAL_TIERS = [
  { label: "Gold Sponsors", value: "Gold Sponsor  🥇", icon: GiGoldBar },
  { label: "Silver Sponsors", value: "Silver Sponsor 🥈", icon: PiMedalFill },
  { label: "Bronze Sponsors", value: "Bronze Sponsor 🥉", icon: RiMedalFill },
  { label: "Backers", value: "Backer 💚", icon: FaShieldHeart },
] as const

const CompanySponsors = (props: { sponsors: CompanySponsor[] }) =>
  METAL_TIERS.map((tier) => {
    const tierValues = Object.values(METAL_TIERS).map(
      (t) => t.value,
    ) as string[]

    const sponsors = props.sponsors.filter((c) => {
      if (c.tier === tier.value) return true
      if (tier.label === "Backers" && !tierValues.includes(c.tier)) return true
      return false
    })

    return (
      <Stack key={tier.label} gap="6">
        <Flex gap="4" align="center" color="teal.500">
          <tier.icon />
          <Text fontWeight="medium">{tier.label}</Text>
        </Flex>
        <SponsorGroup sponsors={sponsors} />
      </Stack>
    )
  })

const IndividualSponsors = (props: { sponsors: IndividualSponsor[] }) => (
  <Stack gap="6">
    <Flex gap="4" align="center" color="teal.500">
      <Text fontWeight="medium">Individual Sponsors</Text>
    </Flex>
    <SponsorGroup {...props} />
  </Stack>
)

const SponsorsList = () => {
  const sponsors = getAllSponsors()

  return (
    <>
      <CompanySponsors sponsors={sponsors.companies} />
      <IndividualSponsors sponsors={sponsors.individuals} />
    </>
  )
}

export const Sponsors = () => {
  return (
    <Container>
      <Stack gap="14" pos="relative">
        <Circle
          size="765px"
          pos="absolute"
          top="-20%"
          left="30%"
          opacity="0.15"
          filter="blur(250px)"
          bg="teal.500"
        />
        <Flex align="center" justify="space-between">
          <Intro />
          <Description />
        </Flex>
        <SponsorsList />
      </Stack>
    </Container>
  )
}
