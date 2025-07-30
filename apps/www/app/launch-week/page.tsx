"use client"

import { ColorModeButton } from "@/components/ui/color-mode"
import {
  Badge,
  Box,
  Card,
  Center,
  Container,
  Flex,
  Grid,
  HStack,
  Heading,
  Icon,
  Image,
  Link,
  Separator,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react"
import {
  Brain,
  CheckCircle,
  ChevronRight,
  Code,
  ExternalLink,
  Github,
  Sparkles,
  Twitter,
  Users,
  Video,
  Youtube,
} from "lucide-react"

// Constants
const LAUNCH_DAYS = [
  {
    day: "Day 1",
    date: "Tuesday, August 5",
    title: "AI Day",
    subtitle: "Chakra UI MCP Server",
    description:
      "Introducing the Chakra UI MCP Server, a brand new way to connect Chakra UI to AI tools using Model Context Protocol. It lets LLMs like Claude use Chakra UI tokens to create scalable applications and design systems.",
    icon: Brain,
    color: "teal",
    features: [
      "Smarter design-to-code handoffs",
      "AI tools that know your theme",
      "Developer workflows that feel... magical",
    ],
    cards: [
      {
        title: "Blog Post & Video",
        description: "Explainer video & getting started guide",
        icon: Video,
      },
      {
        title: "MCP Server",
        description: "Connect Chakra UI to AI tools",
        icon: ExternalLink,
      },
    ],
  },
  {
    day: "Day 2",
    date: "Wednesday, August 6",
    title: "Developer Experience Day",
    subtitle: "Faster dev time",
    description:
      "Here's what's coming: New Components like Command Palette for quick actions & navigation via keyboard, and Code Block with syntax-highlighted code with Chakra theming.",
    icon: Code,
    color: "blue",
    features: [
      "Open any example in Stackblitz",
      "Copy .llm.mdx files for every component",
      "Plug Chakra into your AI tools",
    ],
    cards: [
      {
        title: "New Components",
        description: "Command Palette & Code Block",
        icon: Video,
      },
      {
        title: "Enhanced Docs",
        description: "Stackblitz & AI-ready files",
        icon: ExternalLink,
      },
    ],
  },
  {
    day: "Day 3",
    date: "Thursday, August 7",
    title: "Community Day",
    subtitle: "Time to wrap it up together 🎉",
    description:
      "We're going live on YouTube to recap everything we launched, give live demos, and invite YOU (the community!) to ask questions, share what you're building, or just vibe with us.",
    icon: Users,
    color: "purple",
    features: [
      "Recap everything we launched",
      "Give live demos",
      "Community Q&A & showcases",
      "Giveaways & dev shoutouts",
    ],
    cards: [
      {
        title: "YouTube Live",
        description: "Interactive community celebration",
        icon: Youtube,
      },
      {
        title: "Giveaways",
        description: "Amazing prizes for the community",
        icon: ExternalLink,
      },
    ],
  },
]

// Components
const Logo = () => (
  <HStack gap={3}>
    <Image src="/chakra-logomark.svg" alt="Chakra UI" h="8" />
    <Text fontSize="lg" fontWeight="bold">
      Launch Week
    </Text>
  </HStack>
)

const ImagePlaceholder = ({
  height,
  color,
  ...props
}: {
  height: string
  color: string
  [key: string]: any
}) => (
  <Center
    w="full"
    h={height}
    bg={{ base: `${color}.50`, _dark: `${color}.950` }}
    color="fg.muted"
    fontSize="sm"
    position="relative"
    overflow="hidden"
    borderRadius="lg"
    border="1px solid"
    borderColor="border.muted"
    {...props}
  >
    <VStack gap={2}>
      <Icon size="2xl" color="fg.muted">
        <Video />
      </Icon>
      <Text fontSize="sm" fontWeight="medium">
        Launch Week Preview
      </Text>
    </VStack>
    <Box
      position="absolute"
      top="0"
      left="0"
      right="0"
      bottom="0"
      bgGradient={{
        base: "linear(45deg, transparent, whiteAlpha.200, transparent)",
        _dark: "linear(45deg, transparent, blackAlpha.200, transparent)",
      }}
      pointerEvents="none"
    />
  </Center>
)

const BackgroundElements = () => (
  <>
    {/* Background Gradients */}
    <Box
      position="absolute"
      top="0"
      right="0"
      w="100%"
      h="100%"
      bgGradient={{
        base: "radial(circle at 80% 20%, teal.100/15, transparent 50%)",
        _dark: "radial(circle at 80% 20%, teal.900/20, transparent 50%)",
      }}
    />
    <Box
      position="absolute"
      bottom="0"
      left="0"
      w="100%"
      h="100%"
      bgGradient={{
        base: "radial(circle at 20% 80%, blue.100/12, transparent 60%)",
        _dark: "radial(circle at 20% 80%, blue.900/18, transparent 60%)",
      }}
    />

    {/* Floating Geometric Elements */}
    <Box
      position="absolute"
      top="15%"
      left="5%"
      w="32"
      h="32"
      border="1px solid"
      borderColor={{ base: "teal.200/50", _dark: "teal.600/40" }}
      borderRadius="2xl"
      opacity="0.6"
      transform="rotate(15deg)"
      bg={{ base: "teal.50/30", _dark: "teal.900/20" }}
    />
    <Box
      position="absolute"
      top="60%"
      right="8%"
      w="20"
      h="20"
      bg={{ base: "blue.100/70", _dark: "blue.800/60" }}
      borderRadius="full"
      opacity="0.7"
      border="1px solid"
      borderColor={{ base: "blue.200/50", _dark: "blue.600/40" }}
    />
    <Box
      position="absolute"
      bottom="20%"
      left="15%"
      w="16"
      h="16"
      border="1px solid"
      borderColor={{ base: "purple.200/50", _dark: "purple.600/40" }}
      borderRadius="md"
      opacity="0.6"
      transform="rotate(-12deg)"
      bg={{ base: "purple.50/30", _dark: "purple.900/20" }}
    />
  </>
)

export default function LaunchWeekPage() {
  return (
    <Box bg="bg" minH="100vh">
      {/* Hero Section - Modern PRO Design */}
      <Box position="relative" minH="100vh" bg="bg" overflow="hidden">
        {/* Background Elements */}
        <Box
          position="absolute"
          top="0"
          right="0"
          w="100%"
          h="100%"
          bgGradient={{
            base: "radial(circle at 80% 20%, teal.100/15, transparent 50%)",
            _dark: "radial(circle at 80% 20%, teal.900/20, transparent 50%)",
          }}
        />

        {/* Additional Background Gradient */}
        <Box
          position="absolute"
          bottom="0"
          left="0"
          w="100%"
          h="100%"
          bgGradient={{
            base: "radial(circle at 20% 80%, blue.100/12, transparent 60%)",
            _dark: "radial(circle at 20% 80%, blue.900/18, transparent 60%)",
          }}
        />

        {/* Floating Geometric Elements */}
        <Box
          position="absolute"
          top="15%"
          left="5%"
          w="32"
          h="32"
          border="1px solid"
          borderColor={{ base: "teal.200/50", _dark: "teal.600/40" }}
          borderRadius="2xl"
          opacity="0.6"
          transform="rotate(15deg)"
          bg={{ base: "teal.50/30", _dark: "teal.900/20" }}
        />
        <Box
          position="absolute"
          top="60%"
          right="8%"
          w="20"
          h="20"
          bg={{ base: "blue.100/70", _dark: "blue.800/60" }}
          borderRadius="full"
          opacity="0.7"
          border="1px solid"
          borderColor={{ base: "blue.200/50", _dark: "blue.600/40" }}
        />
        <Box
          position="absolute"
          bottom="20%"
          left="15%"
          w="16"
          h="16"
          border="1px solid"
          borderColor={{ base: "purple.200/50", _dark: "purple.600/40" }}
          borderRadius="md"
          opacity="0.6"
          transform="rotate(-12deg)"
          bg={{ base: "purple.50/30", _dark: "purple.900/20" }}
        />
        <Box
          position="absolute"
          top="25%"
          right="20%"
          w="8"
          h="8"
          bg={{ base: "orange.100/60", _dark: "orange.800/50" }}
          borderRadius="sm"
          opacity="0.7"
          transform="rotate(45deg)"
          border="1px solid"
          borderColor={{ base: "orange.200/50", _dark: "orange.600/40" }}
        />

        <Container h="100vh" display="flex" flexDirection="column">
          {/* Top Navigation */}
          <HStack justify="space-between" py={6}>
            <Logo />
            <ColorModeButton />
          </HStack>

          {/* Main Hero Content */}
          <Flex flex="1" align="center" justify="center">
            <VStack
              gap={16}
              textAlign="center"
              maxW="7xl"
              mx="auto"
              position="relative"
            >
              {/* Enhanced Floating Visual Elements */}
              <Box
                position="absolute"
                top="-20"
                left="10%"
                w="20"
                h="20"
                bg={{ base: "teal.100/50", _dark: "teal.800/40" }}
                borderRadius="full"
                opacity="0.8"
                boxShadow="sm"
                border="1px solid"
                borderColor={{ base: "teal.200/40", _dark: "teal.600/30" }}
              />
              <Box
                position="absolute"
                top="-10"
                right="15%"
                w="6"
                h="6"
                bg={{ base: "blue.100/60", _dark: "blue.800/50" }}
                borderRadius="sm"
                opacity="0.9"
                boxShadow="sm"
                border="1px solid"
                borderColor={{ base: "blue.200/40", _dark: "blue.600/30" }}
              />

              {/* Additional Floating Elements */}
              <Box
                position="absolute"
                top="-32"
                left="30%"
                w="12"
                h="12"
                border="1px solid"
                borderColor={{ base: "green.200/50", _dark: "green.600/40" }}
                borderRadius="lg"
                opacity="0.6"
                transform="rotate(20deg)"
                bg={{ base: "green.50/30", _dark: "green.900/20" }}
              />
              <Box
                position="absolute"
                top="-16"
                right="35%"
                w="4"
                h="4"
                bg={{ base: "orange.100/70", _dark: "orange.800/60" }}
                borderRadius="full"
                opacity="0.8"
                border="1px solid"
                borderColor={{ base: "orange.200/40", _dark: "orange.600/30" }}
              />
              <Box
                position="absolute"
                bottom="-24"
                left="20%"
                w="8"
                h="8"
                bg={{ base: "purple.100/50", _dark: "purple.800/40" }}
                borderRadius="md"
                opacity="0.7"
                transform="rotate(-15deg)"
                border="1px solid"
                borderColor={{ base: "purple.200/40", _dark: "purple.600/30" }}
              />
              <Box
                position="absolute"
                bottom="-20"
                right="25%"
                w="14"
                h="14"
                border="1px solid"
                borderColor={{ base: "pink.200/50", _dark: "pink.600/40" }}
                borderRadius="xl"
                opacity="0.6"
                transform="rotate(30deg)"
                bg={{ base: "pink.50/30", _dark: "pink.900/20" }}
              />

              {/* Badge */}
              <Badge
                size="lg"
                variant="subtle"
                colorPalette="teal"
                borderRadius="full"
                px={8}
                py={4}
                fontSize="md"
                fontWeight="bold"
                boxShadow="sm"
              >
                <HStack gap={3}>
                  <Icon size="md" color="teal.fg">
                    <Sparkles />
                  </Icon>
                  <Text>August 5-7, 2025</Text>
                  <Box w="2" h="2" bg="teal.solid" borderRadius="full" />
                </HStack>
              </Badge>

              {/* Massive Heading */}
              <VStack gap={8}>
                <Heading
                  as="h1"
                  fontSize={{ base: "6xl", md: "8xl", lg: "9xl" }}
                  fontWeight="black"
                  lineHeight="0.85"
                  maxW="6xl"
                  letterSpacing="-0.02em"
                  textShadow="0 1px 3px rgba(0,0,0,0.1)"
                >
                  <Text as="span" color="fg" display="block" fontWeight="black">
                    Chakra UI
                  </Text>
                  <Text
                    as="span"
                    display="block"
                    mt={-2}
                    color={{ base: "teal.500", _dark: "teal.400" }}
                    fontWeight="black"
                  >
                    Launch Week
                  </Text>
                </Heading>

                <Text
                  fontSize={{ base: "2xl", md: "3xl" }}
                  color="fg.muted"
                  maxW="5xl"
                  lineHeight="1.4"
                  fontWeight="medium"
                  textAlign="center"
                >
                  Join us for a 3-day virtual event featuring new launches,
                  product demos, and improved Developer Experience for our
                  community.
                </Text>
              </VStack>

              {/* Visual Stats/Highlights */}
              <HStack gap={12} flexWrap="wrap" justify="center" opacity="0.9">
                <VStack gap={2}>
                  <Text
                    fontSize="2xl"
                    color="teal.fg"
                    fontWeight="bold"
                    textTransform="uppercase"
                  >
                    AI
                  </Text>
                  <Text fontSize="sm" color="fg.muted" fontWeight="medium">
                    DAY 1
                  </Text>
                </VStack>
                <Box w="1" h="12" bg="border.muted" />
                <VStack gap={2}>
                  <Text
                    fontSize="2xl"
                    color="blue.fg"
                    fontWeight="bold"
                    textTransform="uppercase"
                  >
                    DX
                  </Text>
                  <Text fontSize="sm" color="fg.muted" fontWeight="medium">
                    DAY 2
                  </Text>
                </VStack>
                <Box w="1" h="12" bg="border.muted" />
                <VStack gap={2}>
                  <Text
                    fontSize="2xl"
                    color="purple.fg"
                    fontWeight="bold"
                    textTransform="uppercase"
                  >
                    Live
                  </Text>
                  <Text fontSize="sm" color="fg.muted" fontWeight="medium">
                    DAY 3
                  </Text>
                </VStack>
              </HStack>
            </VStack>
          </Flex>

          {/* Bottom Scroll Indicator */}
          <VStack
            pb={8}
            opacity={0.6}
            cursor="pointer"
            onClick={() => {
              document.getElementById("events-section")?.scrollIntoView({
                behavior: "smooth",
              })
            }}
            _hover={{ opacity: 1 }}
            transition="opacity 0.2s"
          >
            <Text fontSize="sm" color="fg.muted">
              Scroll to explore
            </Text>
            <Icon size="sm" color="fg.muted">
              <ChevronRight style={{ transform: "rotate(90deg)" }} />
            </Icon>
          </VStack>
        </Container>
      </Box>

      {/* Launch Week Events - Creative PRO Design */}
      <Box id="events-section" py={{ base: "20", md: "28" }} bg="bg.subtle">
        <Container maxW="7xl">
          <VStack gap={32}>
            {/* Section Header */}
            <VStack gap={6} textAlign="center">
              <Badge
                size="lg"
                variant="surface"
                colorPalette="purple"
                px={6}
                py={3}
              >
                <HStack gap={2}>
                  <Icon size="sm" color="purple.fg">
                    <Sparkles />
                  </Icon>
                  <Text fontWeight="semibold">Launch Week 2025</Text>
                </HStack>
              </Badge>
              <Heading
                size={{ base: "4xl", md: "6xl" }}
                maxW="4xl"
                lineHeight="1.1"
              >
                Three Days of Innovation
              </Heading>
              <Text
                fontSize={{ base: "lg", md: "xl" }}
                color="fg.muted"
                maxW="3xl"
              >
                Each day showcases releases, exclusive updates, and exciting new
                features.
              </Text>
            </VStack>

            {/* Day 1 - AI Day */}
            <Grid
              templateColumns={{ base: "1fr", lg: "1fr 1fr" }}
              gap={{ base: 12, lg: 20 }}
              alignItems="stretch"
              w="full"
            >
              <VStack
                gap={8}
                align="start"
                textAlign={{ base: "center", lg: "left" }}
                h="full"
              >
                <VStack gap={4} align={{ base: "center", lg: "start" }}>
                  <HStack gap={3}>
                    <Box
                      w={12}
                      h={12}
                      bg="teal.solid"
                      color="teal.contrast"
                      borderRadius="full"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      boxShadow="lg"
                    >
                      <Icon size="lg">
                        <Brain />
                      </Icon>
                    </Box>
                    <VStack gap={0} align="start">
                      <Text
                        fontSize="sm"
                        color="teal.fg"
                        fontWeight="semibold"
                        textTransform="uppercase"
                      >
                        Day 1 • Tuesday, August 5
                      </Text>
                      <Text fontSize="xs" color="fg.muted">
                        We're going big on AI
                      </Text>
                    </VStack>
                  </HStack>

                  <Heading size="4xl" color="fg">
                    AI Day
                  </Heading>
                  <Text fontSize="xl" color="teal.fg" fontWeight="medium">
                    Chakra UI MCP Server
                  </Text>
                  <Text color="fg.muted" fontSize="lg" lineHeight="1.6">
                    Introducing the Chakra UI MCP Server, a brand new way to
                    connect Chakra UI to AI tools using Model Context Protocol.
                    It lets LLMs like Claude use Chakra UI tokens to create
                    scalable applications and design systems.
                  </Text>

                  <VStack gap={3} align={{ base: "center", lg: "start" }}>
                    <VStack gap={2} align={{ base: "center", lg: "start" }}>
                      <HStack gap={2}>
                        <Icon size="sm" color="teal.fg">
                          <CheckCircle />
                        </Icon>
                        <Text fontSize="sm">
                          Smarter design-to-code handoffs
                        </Text>
                      </HStack>
                      <HStack gap={2}>
                        <Icon size="sm" color="teal.fg">
                          <CheckCircle />
                        </Icon>
                        <Text fontSize="sm">AI tools that know your theme</Text>
                      </HStack>
                      <HStack gap={2}>
                        <Icon size="sm" color="teal.fg">
                          <CheckCircle />
                        </Icon>
                        <Text fontSize="sm">
                          Developer workflows that feel... magical
                        </Text>
                      </HStack>
                    </VStack>
                  </VStack>
                </VStack>

                <SimpleGrid columns={2} gap={4} w="full">
                  <Card.Root
                    variant="elevated"
                    size="sm"
                    bg="bg.panel"
                    borderColor="border.muted"
                    cursor="pointer"
                    transition="all 0.2s"
                    _hover={{
                      transform: "translateY(-2px)",
                      boxShadow: "lg",
                      borderColor: "teal.300",
                    }}
                  >
                    <Card.Body>
                      <VStack gap={2} align="start">
                        <Icon color="teal.fg" size="md">
                          <Video />
                        </Icon>
                        <Text fontWeight="medium" fontSize="sm">
                          Blog Post & Video
                        </Text>
                        <Text fontSize="xs" color="fg.muted">
                          Explainer video & getting started guide
                        </Text>
                      </VStack>
                    </Card.Body>
                  </Card.Root>

                  <Card.Root
                    variant="elevated"
                    size="sm"
                    bg="bg.panel"
                    borderColor="border.muted"
                    cursor="pointer"
                    transition="all 0.2s"
                    _hover={{
                      transform: "translateY(-2px)",
                      boxShadow: "lg",
                      borderColor: "teal.300",
                    }}
                    onClick={() => {
                      // Add your link/action here
                      console.log("MCP Server clicked")
                    }}
                  >
                    <Card.Body>
                      <VStack gap={2} align="start">
                        <Icon color="teal.fg" size="md">
                          <ExternalLink />
                        </Icon>
                        <Text fontWeight="medium" fontSize="sm">
                          MCP Server
                        </Text>
                        <Text fontSize="xs" color="fg.muted">
                          Connect Chakra UI to AI tools
                        </Text>
                      </VStack>
                    </Card.Body>
                  </Card.Root>
                </SimpleGrid>
              </VStack>

              <Card.Root
                overflow="hidden"
                variant="elevated"
                boxShadow="2xl"
                bg="bg.panel"
                borderColor="border.muted"
              >
                <Card.Header p="0">
                  <Box position="relative">
                    <ImagePlaceholder height="80" color="teal" />
                    <Box
                      position="absolute"
                      top="4"
                      right="4"
                      bg="bg.panel"
                      color="teal.fg"
                      px={3}
                      py={1}
                      borderRadius="full"
                      fontSize="sm"
                      fontWeight="bold"
                      boxShadow="md"
                      border="1px solid"
                      borderColor="border.muted"
                    >
                      AI Day
                    </Box>
                  </Box>
                </Card.Header>
                <Card.Body>
                  <VStack gap={3} align="start">
                    <Heading size="lg">MCP Server Launch</Heading>
                    <Text color="fg.muted">
                      A brand new way to connect Chakra UI to AI tools using
                      Model Context Protocol
                    </Text>
                    <HStack gap={6} pt={2}>
                      <HStack gap={2}>
                        <Icon size="sm" color="teal.fg">
                          <CheckCircle />
                        </Icon>
                        <Text fontSize="sm">Blog Post</Text>
                      </HStack>
                      <HStack gap={2}>
                        <Icon size="sm" color="teal.fg">
                          <CheckCircle />
                        </Icon>
                        <Text fontSize="sm">Video Demo</Text>
                      </HStack>
                    </HStack>
                  </VStack>
                </Card.Body>
              </Card.Root>
            </Grid>

            {/* Day 2 - DX Day */}
            <Grid
              templateColumns={{ base: "1fr", lg: "1fr 1fr" }}
              gap={{ base: 12, lg: 20 }}
              alignItems="stretch"
              w="full"
              direction={{ lg: "row-reverse" }}
            >
              <Card.Root
                overflow="hidden"
                variant="elevated"
                boxShadow="2xl"
                bg="bg.panel"
                borderColor="border.muted"
              >
                <Card.Header p="0">
                  <Box position="relative">
                    <ImagePlaceholder height="80" color="blue" />
                    <Box
                      position="absolute"
                      top="4"
                      right="4"
                      bg="bg.panel"
                      color="blue.fg"
                      px={3}
                      py={1}
                      borderRadius="full"
                      fontSize="sm"
                      fontWeight="bold"
                      boxShadow="md"
                      border="1px solid"
                      borderColor="border.muted"
                    >
                      DX Day
                    </Box>
                  </Box>
                </Card.Header>
                <Card.Body>
                  <VStack gap={3} align="start">
                    <Heading size="lg">New Tools & Smoother Workflows</Heading>
                    <Text color="fg.muted">
                      Command Palette, Code Block components, Stackblitz
                      integration, and AI-ready docs
                    </Text>
                    <HStack gap={6} pt={2}>
                      <HStack gap={2}>
                        <Icon size="sm" color="blue.fg">
                          <CheckCircle />
                        </Icon>
                        <Text fontSize="sm">Command Palette</Text>
                      </HStack>
                      <HStack gap={2}>
                        <Icon size="sm" color="blue.fg">
                          <CheckCircle />
                        </Icon>
                        <Text fontSize="sm">Code Blocks</Text>
                      </HStack>
                    </HStack>
                  </VStack>
                </Card.Body>
              </Card.Root>

              <VStack
                gap={8}
                align="start"
                textAlign={{ base: "center", lg: "left" }}
                h="full"
              >
                <VStack gap={4} align={{ base: "center", lg: "start" }}>
                  <HStack gap={3}>
                    <Box
                      w={12}
                      h={12}
                      bg="blue.solid"
                      color="blue.contrast"
                      borderRadius="full"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      boxShadow="lg"
                    >
                      <Icon size="lg">
                        <Code />
                      </Icon>
                    </Box>
                    <VStack gap={0} align="start">
                      <Text
                        fontSize="sm"
                        color="blue.fg"
                        fontWeight="semibold"
                        textTransform="uppercase"
                      >
                        Day 2 • Wednesday, August 6
                      </Text>
                      <Text fontSize="xs" color="fg.muted">
                        New tools. Smoother workflows.
                      </Text>
                    </VStack>
                  </HStack>

                  <Heading size="4xl" color="fg">
                    Developer Experience Day
                  </Heading>
                  <Text fontSize="xl" color="blue.fg" fontWeight="medium">
                    Faster dev time
                  </Text>
                  <Text color="fg.muted" fontSize="lg" lineHeight="1.6">
                    Here's what's coming: New Components like Command Palette
                    for quick actions & navigation via keyboard, and Code Block
                    with syntax-highlighted code with Chakra theming.
                  </Text>

                  <VStack gap={3} align={{ base: "center", lg: "start" }}>
                    <Text color="fg.muted" fontSize="md" fontWeight="medium">
                      Docs just got better:
                    </Text>
                    <VStack gap={2} align={{ base: "center", lg: "start" }}>
                      <HStack gap={2}>
                        <Icon size="sm" color="blue.fg">
                          <CheckCircle />
                        </Icon>
                        <Text fontSize="sm">
                          Open any example in Stackblitz
                        </Text>
                      </HStack>
                      <HStack gap={2}>
                        <Icon size="sm" color="blue.fg">
                          <CheckCircle />
                        </Icon>
                        <Text fontSize="sm">
                          Copy .llm.mdx files for every component
                        </Text>
                      </HStack>
                      <HStack gap={2}>
                        <Icon size="sm" color="blue.fg">
                          <CheckCircle />
                        </Icon>
                        <Text fontSize="sm">
                          Plug Chakra into your AI tools
                        </Text>
                      </HStack>
                    </VStack>
                  </VStack>
                </VStack>

                <SimpleGrid columns={2} gap={4} w="full">
                  <Card.Root
                    variant="elevated"
                    size="sm"
                    bg="bg.panel"
                    borderColor="border.muted"
                  >
                    <Card.Body>
                      <VStack gap={2} align="start">
                        <Icon color="blue.fg" size="md">
                          <Video />
                        </Icon>
                        <Text fontWeight="medium" fontSize="sm">
                          New Components
                        </Text>
                        <Text fontSize="xs" color="fg.muted">
                          Command Palette & Code Block
                        </Text>
                      </VStack>
                    </Card.Body>
                  </Card.Root>

                  <Card.Root
                    variant="elevated"
                    size="sm"
                    bg="bg.panel"
                    borderColor="border.muted"
                  >
                    <Card.Body>
                      <VStack gap={2} align="start">
                        <Icon color="blue.fg" size="md">
                          <ExternalLink />
                        </Icon>
                        <Text fontWeight="medium" fontSize="sm">
                          Enhanced Docs
                        </Text>
                        <Text fontSize="xs" color="fg.muted">
                          Stackblitz & AI-ready files
                        </Text>
                      </VStack>
                    </Card.Body>
                  </Card.Root>
                </SimpleGrid>
              </VStack>
            </Grid>

            {/* Day 3 - Community Day */}
            <Grid
              templateColumns={{ base: "1fr", lg: "1fr 1fr" }}
              gap={{ base: 12, lg: 20 }}
              alignItems="stretch"
              w="full"
            >
              <VStack
                gap={8}
                align="start"
                textAlign={{ base: "center", lg: "left" }}
                h="full"
              >
                <VStack gap={4} align={{ base: "center", lg: "start" }}>
                  <HStack gap={3}>
                    <Box
                      w={12}
                      h={12}
                      bg="purple.solid"
                      color="purple.contrast"
                      borderRadius="full"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      boxShadow="lg"
                    >
                      <Icon size="lg">
                        <Users />
                      </Icon>
                    </Box>
                    <VStack gap={0} align="start">
                      <Text
                        fontSize="sm"
                        color="purple.fg"
                        fontWeight="semibold"
                        textTransform="uppercase"
                      >
                        Day 3 • Thursday, August 7
                      </Text>
                      <Text fontSize="xs" color="fg.muted">
                        5PM BST / 12PM ET
                      </Text>
                    </VStack>
                  </HStack>

                  <Heading size="4xl" color="fg">
                    Community Day
                  </Heading>
                  <Text fontSize="xl" color="purple.fg" fontWeight="medium">
                    Time to wrap it up together 🎉
                  </Text>
                  <Text color="fg.muted" fontSize="lg" lineHeight="1.6">
                    We're going live on YouTube to recap everything we launched,
                    give live demos, and invite YOU (the community!) to ask
                    questions, share what you're building, or just vibe with us.
                  </Text>

                  <VStack gap={3} align={{ base: "center", lg: "start" }}>
                    <Text color="fg.muted" fontSize="md" fontWeight="medium">
                      Join us for:
                    </Text>
                    <VStack gap={2} align={{ base: "center", lg: "start" }}>
                      <HStack gap={2}>
                        <Icon size="sm" color="purple.fg">
                          <CheckCircle />
                        </Icon>
                        <Text fontSize="sm">Recap everything we launched</Text>
                      </HStack>
                      <HStack gap={2}>
                        <Icon size="sm" color="purple.fg">
                          <CheckCircle />
                        </Icon>
                        <Text fontSize="sm">Give live demos</Text>
                      </HStack>
                      <HStack gap={2}>
                        <Icon size="sm" color="purple.fg">
                          <CheckCircle />
                        </Icon>
                        <Text fontSize="sm">Community Q&A & showcases</Text>
                      </HStack>
                      <HStack gap={2}>
                        <Icon size="sm" color="purple.fg">
                          <CheckCircle />
                        </Icon>
                        <Text fontSize="sm">Giveaways & dev shoutouts</Text>
                      </HStack>
                    </VStack>
                  </VStack>
                </VStack>

                <SimpleGrid columns={2} gap={4} w="full">
                  <Card.Root
                    variant="elevated"
                    size="sm"
                    bg="bg.panel"
                    borderColor="border.muted"
                  >
                    <Card.Body>
                      <VStack gap={2} align="start">
                        <Icon color="purple.fg" size="md">
                          <Youtube />
                        </Icon>
                        <Text fontWeight="medium" fontSize="sm">
                          YouTube Live
                        </Text>
                        <Text fontSize="xs" color="fg.muted">
                          Interactive community celebration
                        </Text>
                      </VStack>
                    </Card.Body>
                  </Card.Root>

                  <Card.Root
                    variant="elevated"
                    size="sm"
                    bg="bg.panel"
                    borderColor="border.muted"
                  >
                    <Card.Body>
                      <VStack gap={2} align="start">
                        <Icon color="purple.fg" size="md">
                          <ExternalLink />
                        </Icon>
                        <Text fontWeight="medium" fontSize="sm">
                          Giveaways
                        </Text>
                        <Text fontSize="xs" color="fg.muted">
                          Amazing prizes for the community
                        </Text>
                      </VStack>
                    </Card.Body>
                  </Card.Root>
                </SimpleGrid>
              </VStack>

              <Card.Root
                overflow="hidden"
                variant="elevated"
                boxShadow="2xl"
                bg="bg.panel"
                borderColor="border.muted"
              >
                <Card.Header p="0">
                  <Box position="relative">
                    <ImagePlaceholder height="80" color="purple" />
                    <Box
                      position="absolute"
                      top="4"
                      right="4"
                      bg="bg.panel"
                      color="purple.fg"
                      px={3}
                      py={1}
                      borderRadius="full"
                      fontSize="sm"
                      fontWeight="bold"
                      boxShadow="md"
                      border="1px solid"
                      borderColor="border.muted"
                    >
                      Community Day
                    </Box>
                  </Box>
                </Card.Header>
                <Card.Body>
                  <VStack gap={3} align="start">
                    <Heading size="lg">Live Community Celebration</Heading>
                    <Text color="fg.muted">
                      Join us on YouTube for live demos, Q&A, giveaways, and
                      community showcases
                    </Text>
                    <HStack gap={6} pt={2}>
                      <HStack gap={2}>
                        <Icon size="sm" color="purple.fg">
                          <CheckCircle />
                        </Icon>
                        <Text fontSize="sm">Live Q&A</Text>
                      </HStack>
                      <HStack gap={2}>
                        <Icon size="sm" color="purple.fg">
                          <CheckCircle />
                        </Icon>
                        <Text fontSize="sm">Giveaways</Text>
                      </HStack>
                    </HStack>
                  </VStack>
                </Card.Body>
              </Card.Root>
            </Grid>
          </VStack>
        </Container>
      </Box>

      <Separator />

      {/* Footer */}
      <Box py={12} bg="bg">
        <Container maxW="6xl">
          <VStack gap={8}>
            <Logo />

            <HStack gap={8} flexWrap="wrap" justify="center">
              <Link
                fontSize="sm"
                color="fg.muted"
                _hover={{ color: "fg" }}
                fontWeight="medium"
              >
                Event Details
              </Link>
              <Link
                fontSize="sm"
                color="fg.muted"
                _hover={{ color: "fg" }}
                fontWeight="medium"
              >
                Schedule
              </Link>
              <Link
                fontSize="sm"
                color="fg.muted"
                _hover={{ color: "fg" }}
                fontWeight="medium"
              >
                About Chakra UI
              </Link>
              <Link
                fontSize="sm"
                color="fg.muted"
                _hover={{ color: "fg" }}
                fontWeight="medium"
              >
                Contact
              </Link>
            </HStack>

            <HStack gap={6}>
              <Link
                color="fg.muted"
                _hover={{ color: "teal.fg" }}
                transition="color 0.2s"
              >
                <Icon size="lg">
                  <Github />
                </Icon>
              </Link>
              <Link
                color="fg.muted"
                _hover={{ color: "blue.fg" }}
                transition="color 0.2s"
              >
                <Icon size="lg">
                  <Twitter />
                </Icon>
              </Link>
              <Link
                color="fg.muted"
                _hover={{ color: "purple.fg" }}
                transition="color 0.2s"
              >
                <Icon size="lg">
                  <Youtube />
                </Icon>
              </Link>
            </HStack>

            <Text fontSize="sm" color="fg.muted" textAlign="center">
              © 2025 Chakra UI. Built with ❤️ for the developer community.
            </Text>
          </VStack>
        </Container>
      </Box>
    </Box>
  )
}
