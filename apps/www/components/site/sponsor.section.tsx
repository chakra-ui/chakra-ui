import {
  Box,
  BoxProps,
  Button,
  Center,
  Container,
  Flex,
  Group,
  HStack,
  Image,
  Span,
  Stack,
  Text,
} from "@chakra-ui/react"
import { Blob } from "./blob"
import {
  GoldSponsorIcon,
  OpenCollective,
  Patreon,
  SilverSponsorIcon,
} from "./icons"
import { SponsorImage } from "./sponsor-image"
import { BlitzHeading, HighlightHeading } from "./typography"

const CallToActions = () => (
  <Group gap="5">
    <Button
      asChild
      colorPalette="teal"
      size="lg"
      _icon={{ height: "5", width: "auto" }}
    >
      <a href="https://opencollective.com/chakra-ui">
        <OpenCollective />
        Sponsor
      </a>
    </Button>
    <Button
      asChild
      colorPalette="teal"
      size="lg"
      variant="outline"
      _icon={{ height: "5", width: "auto" }}
    >
      <a
        target="_blank"
        rel="noopener"
        href="https://www.patreon.com/segunadebayo"
      >
        <Patreon />
        Patreon
      </a>
    </Button>
  </Group>
)

const SponsorGroup = (props: {
  sponsors: Sponsor[]
  size?: BoxProps["boxSize"]
}) => {
  const { sponsors, size = "10" } = props
  return (
    <HStack
      wrap="wrap"
      zIndex="5"
      gap="0"
      css={{
        "& > *": {
          "--border-width": "1px",
          borderWidth: "1px",
          borderColor: { _light: "border", _dark: "#001B18" },
          mr: "calc(var(--border-width) * -1)",
          mb: "calc(var(--border-width) * -1)",
          py: "4",
        },
      }}
    >
      {sponsors.map((sponsor) => {
        return (
          <Center asChild key={sponsor.MemberId} px="4" focusRing="outside">
            <a
              href={sponsor.website ?? sponsor.profile}
              target="_blank"
              rel="noopener"
            >
              <SponsorImage
                image={sponsor.image}
                name={sponsor.name}
                size={size}
              />
            </a>
          </Center>
        )
      })}
    </HStack>
  )
}

interface Sponsor {
  MemberId: number
  createdAt: string
  type: string
  role: string
  tier: string
  isActive: boolean
  totalAmountDonated: number
  currency: string
  lastTransactionAt: string
  lastTransactionAmount: number
  profile: string
  name: string
  company: string | null
  description: string | null
  image: string
  email: string | null
  twitter: string | null
  github: string | null
  website: string | null
}

const TierHeading = (props: { tier: string; icon: React.ElementType }) => {
  const { tier, icon: Icon } = props
  return (
    <Flex
      gap="4"
      align="center"
      color={{ _light: "teal.600", _dark: "teal.500" }}
    >
      <Icon />
      <Text fontWeight="medium">{tier}</Text>
    </Flex>
  )
}

const SponsorsList = async () => {
  const response = await fetch(
    "https://opencollective.com/chakra-ui/members/all.json",
  )

  const allSponsors: Sponsor[] = await response.json()
  const companies = allSponsors
    .filter((sponsor) => sponsor.tier && sponsor.type === "ORGANIZATION")
    .sort((a, b) => b.totalAmountDonated - a.totalAmountDonated)

  const platinumSponsors = companies.filter((c) => c.tier.includes("Platinum"))
  const goldSponsors = companies.filter((c) => c.tier.includes("Gold"))

  const silverSponsors = companies.filter((c) => c.tier.includes("Silver"))
  const bronzeSponsors = companies.filter((c) => c.tier.includes("Bronze"))

  return (
    <Stack gap="20">
      <Stack gap="6">
        <TierHeading tier="Gold + Platinum Sponsors" icon={GoldSponsorIcon} />
        <SponsorGroup sponsors={[...platinumSponsors, ...goldSponsors]} />
      </Stack>

      <Stack gap="6">
        <TierHeading tier="Silver + Bronze Sponsors" icon={SilverSponsorIcon} />
        <SponsorGroup
          size="6"
          sponsors={[...silverSponsors, ...bronzeSponsors]}
        />
      </Stack>
    </Stack>
  )
}

export const SponsorSection = () => {
  return (
    <Box py="20" as="section">
      <Container>
        <Blob width="1400px" height="1400px" top="-80%" left="10%" />

        <Stack gap="20" pos="relative">
          <Stack
            align="flex-start"
            justify="space-between"
            direction={{ base: "column", lg: "row" }}
            gap="4"
            width="100%"
          >
            <Stack
              gap={{ base: "3", md: "6" }}
              maxW={{ lg: "xl" }}
              flexShrink="0"
              flex="1"
            >
              <BlitzHeading mb="4">Sponsors</BlitzHeading>
              <HighlightHeading as="h2" query="amazing">
                Sponsored by these amazing companies
              </HighlightHeading>
            </Stack>

            <Stack gap="6" mt="4">
              <Text textStyle="xl" maxW={{ lg: "lg" }}>
                Our maintainers devote their time, effort, and heart to ensure
                Chakra UI keeps getting better.{" "}
                <Span color="fg.muted">
                  Support us by donating to our collective 🙏
                </Span>
              </Text>
              <CallToActions />
            </Stack>
          </Stack>

          <SponsorsList />
        </Stack>
      </Container>
    </Box>
  )
}
