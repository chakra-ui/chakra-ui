"use client"

import { Logo, LogoBlitzIcon } from "@/components/logo"
import { FooterSection } from "@/components/site/footer.section"
import { BlitzIcon } from "@/components/site/icons"
import {
  Badge,
  Box,
  Card,
  Center,
  Circle,
  Container,
  Grid,
  HStack,
  Heading,
  Icon,
  Separator,
  SimpleGrid,
  Span,
  StackSeparator,
  Text,
  VStack,
} from "@chakra-ui/react"
import { ColorModeButton } from "compositions/ui/color-mode"
import Link from "next/link"
import { LuCircleCheck, LuSparkles } from "react-icons/lu"
import { LAUNCH_DATA, LaunchItem } from "./data"
import { ImagePlaceholder } from "./image-placeholder"

const BlitzIconSection = () => (
  <Icon
    asChild
    w="245px"
    h="342px"
    pos="absolute"
    top="58px"
    right="67px"
    color="fg.inverted"
    hideBelow="md"
  >
    <BlitzIcon />
  </Icon>
)

const LaunchWeekLogo = () => (
  <HStack gap={3}>
    <Logo />
    <Span textStyle="md" fontWeight="medium">
      Launch Week
    </Span>
  </HStack>
)

// DaySection component for rendering each launch day
const DaySection = ({ data, index }: { data: LaunchItem; index: number }) => {
  const {
    day,
    date,
    title,
    subtitle,
    description,
    icon: IconComponent,
    color,
    features,
    cards,
  } = data

  return (
    <Grid
      templateColumns={{ base: "1fr", lg: "1fr 1fr" }}
      gap={{ base: 12, lg: 20 }}
      alignItems="stretch"
      w="full"
      colorPalette={color}
    >
      {/* Content Section */}
      <VStack
        gap={8}
        align="start"
        textAlign={{ base: "center", lg: "left" }}
        h="full"
      >
        <VStack gap="4" align={{ base: "center", lg: "start" }}>
          <HStack gap="5">
            <Circle size="12" layerStyle="fill.solid" borderRadius="full">
              <Icon size="lg">
                <IconComponent />
              </Icon>
            </Circle>
            <HStack
              gap="3"
              textStyle="md"
              color="colorPalette.fg"
              fontWeight="semibold"
              textTransform="uppercase"
              letterSpacing="wide"
            >
              <span>{day}</span>
              <Span opacity="0.5" fontWeight="medium">
                /
              </Span>
              <span>{date}</span>
            </HStack>
          </HStack>

          <Heading size="4xl" color="fg" mt="4">
            {title}
          </Heading>
          <Text color="colorPalette.fg" fontWeight="medium">
            {subtitle}
          </Text>
          <Text color="fg.muted" lineHeight="1.6">
            {description}
          </Text>

          <VStack gap={3} align={{ base: "center", lg: "start" }}>
            {features.map((feature, featureIndex) => (
              <HStack key={featureIndex} gap={2}>
                <Icon size="sm" color="colorPalette.fg">
                  <LuCircleCheck />
                </Icon>
                <Text fontSize="sm">{feature}</Text>
              </HStack>
            ))}
          </VStack>
        </VStack>

        <SimpleGrid columns={2} gap={4} w="full">
          {cards.map((card, idx) => (
            <Card.Root
              key={idx}
              variant="elevated"
              size="sm"
              transition="transform 0.2s"
              _hover={{
                transform: "translateY(-2px)",
              }}
            >
              <Link href={card.url} target="_blank">
                <Card.Body>
                  <HStack gap="4">
                    <Icon color="colorPalette.fg" size="md">
                      <card.icon />
                    </Icon>
                    <Text fontWeight="medium" fontSize="sm">
                      {card.title}
                    </Text>
                  </HStack>
                </Card.Body>
              </Link>
            </Card.Root>
          ))}
        </SimpleGrid>
      </VStack>

      {/* Image Card Section */}
      <Card.Root
        overflow="hidden"
        variant="elevated"
        boxShadow="2xl"
        bg="bg.panel"
        borderColor="border.muted"
      >
        <Card.Header p="0">
          <Box position="relative">
            <ImagePlaceholder height="80" color={color} />
          </Box>
        </Card.Header>
        <Card.Body>
          <VStack gap={3} align="start">
            <Heading size="lg">
              {index === 0 && "MCP Server Launch"}
              {index === 1 && "New Tools & Smoother Workflows"}
              {index === 2 && "Live Community Celebration"}
            </Heading>
            <Text color="fg.muted">
              {index === 0 &&
                "A brand new way to connect Chakra UI to AI tools using Model Context Protocol"}
              {index === 1 &&
                "Command Palette, Code Block components, Stackblitz integration, and AI-ready docs"}
              {index === 2 &&
                "Join us on YouTube for live demos, Q&A, giveaways, and community showcases"}
            </Text>
          </VStack>
        </Card.Body>
      </Card.Root>
    </Grid>
  )
}

const HeroSection = () => {
  return (
    <VStack gap={16} textAlign="center" position="relative">
      <Badge
        size="lg"
        variant="subtle"
        colorPalette="teal"
        borderRadius="full"
        px="8"
        py="4"
        fontSize="md"
        fontWeight="medium"
      >
        <HStack gap={3}>
          <Icon size="md" color="teal.fg">
            <LuSparkles />
          </Icon>
          <Text>Jul 30th - Aug 1st 2025</Text>
        </HStack>
      </Badge>

      <VStack gap={8} textAlign="center">
        <Heading
          as="h1"
          fontSize="5rem"
          fontWeight="semibold"
          lineHeight="1.1"
          maxW="6xl"
          letterSpacing="tight"
        >
          <Span display="block">Chakra UI</Span>
          <Text as="span" display="block" mt={-2} color="teal.solid">
            Launch Week #1
          </Text>
        </Heading>

        <Text textStyle="xl" color="fg.muted" maxW="xl" lineHeight="1.4">
          Join us for a 3-day virtual event showcasing releases, updates, and
          exciting new features.
        </Text>
      </VStack>

      <HStack
        gap={12}
        flexWrap="wrap"
        justify="center"
        opacity="0.9"
        separator={<StackSeparator borderWidth="1.5px" />}
      >
        {[
          { title: "AI", color: "teal" },
          { title: "DX", color: "blue" },
          { title: "Live", color: "purple" },
        ].map((item, idx) => (
          <VStack gap={2} colorPalette={item.color}>
            <Text
              fontSize="2xl"
              color="colorPalette.fg"
              fontWeight="bold"
              textTransform="uppercase"
            >
              {item.title}
            </Text>
            <Text fontSize="sm" color="fg.muted" fontWeight="medium">
              DAY {idx + 1}
            </Text>
          </VStack>
        ))}
      </HStack>
    </VStack>
  )
}

export default function LaunchWeekPage() {
  return (
    <Box bg="bg" minH="100vh">
      <Container>
        <HStack justify="space-between" py={6}>
          <LaunchWeekLogo />
          <ColorModeButton />
        </HStack>
      </Container>

      <BlitzIconSection />

      <Container pt="20" pb="32" display="flex" flexDirection="column">
        <HeroSection />
      </Container>

      <Box
        py={{ base: "20", md: "28" }}
        bg="teal.subtle/10"
        position="relative"
        borderTopWidth="1px"
      >
        <Center
          rounded="lg"
          bg="teal.500"
          css={{ "--size": "sizes.14" }}
          w="var(--size)"
          h="var(--size)"
          top="calc(var(--size)*-0.5)"
          left="50%"
          transform="translateX(-50%)"
          pos="absolute"
        >
          <LogoBlitzIcon fontSize={{ base: "2xl", md: "4xl" }} />
        </Center>

        <Container maxW="7xl">
          <VStack gap={32}>
            {LAUNCH_DATA.map((data, index) => (
              <DaySection key={index} data={data} index={index} />
            ))}
          </VStack>
        </Container>
      </Box>

      <Separator mb="10" />
      <FooterSection />
    </Box>
  )
}
