import { DemoCode } from "@/app/page/demo-code"
import { BlitzFillIcon } from "@/app/page/icons"
import {
  Button,
  Circle,
  Container,
  Flex,
  HStack,
  Heading,
  Image,
  Span,
  Stack,
  Tabs,
  Text,
} from "@chakra-ui/react"
import Link from "next/link"
import { AccessibilityDemo } from "./data/accessibility-demo"

const Intro = () => (
  <Stack gap="10">
    <Stack gap="7" align="flex-start">
      <Stack gap="5">
        <HStack gap="4" color="teal.500">
          <BlitzFillIcon />
          <Text fontWeight="bold">Accessible UI Components</Text>
        </HStack>
        <Heading size="5xl" fontWeight="bold">
          Less code. More speed
        </Heading>
      </Stack>
      <Text textStyle="2xl">
        Meet the system for modern product development.{" "}
        <Span color="gray.400">
          Streamline issues, projects, and product roadmaps.
        </Span>
      </Text>
    </Stack>
    <Button
      asChild
      colorPalette="teal"
      size="lg"
      bg="teal.500"
      color="black"
      w="fit-content"
      px="8"
    >
      <Link href="/docs/get-started/overview/installation">Start Building</Link>
    </Button>
  </Stack>
)

const Testimonial = () => (
  <Stack gap="10" pl="9" borderLeft="solid 4px" borderColor="teal.500">
    <Text color="gray.400">
      “Chakra UI is glorious. Dark mode support looks amazing and it is 100%
      built-in. I love the consistent use of focus styling and the subtle
      animation. Great care for accessibility throughout. It is a guiding
      principle of the design system.”
    </Text>
    <HStack justify="space-between">
      <Stack gap="1" fontWeight="medium">
        <Text>Guillermo Rauch</Text>
        <Text color="gray.400">CEO / Vercel</Text>
      </Stack>
      <Image
        rounded="lg"
        src="https://avatars.githubusercontent.com/u/13041"
        alt="Guillermo Rauch"
        w="12"
        h="12"
        objectFit="contain"
      />
    </HStack>
  </Stack>
)

const CodePreviewSection = () => (
  <Flex
    css={{
      "&, & *": {
        minW: "0",
      },
    }}
    bg="#040A0A"
    border="solid 1px"
    borderColor="#001B18"
    flex="1"
    h="full"
  >
    <Tabs.Root
      variant="plain"
      defaultValue="Preview"
      w="full"
      display="flex"
      flexDir="column"
    >
      <Tabs.List p="2">
        {["Preview", "Code"].map((tab) => (
          <Tabs.Trigger
            key={tab}
            value={tab}
            bg={{ base: "#050D0D/10", _selected: "teal.500/10!" }}
            rounded="0"
            cursor="pointer"
          >
            {tab}
          </Tabs.Trigger>
        ))}
      </Tabs.List>
      <Tabs.ContentGroup rounded="md" overflow="hidden" h="full">
        <Tabs.Content
          value="Preview"
          mt="0"
          h="full"
          display="flex"
          justifyContent="center"
          alignItems="center"
          className="light"
        >
          <AccessibilityDemo />
        </Tabs.Content>
        <Tabs.Content
          value="Code"
          mt="0"
          css={{
            "&  pre": {
              overflow: "auto",
            },
          }}
        >
          <DemoCode
            name="accessibility-demo"
            extension="tsx"
            opts={{
              lang: "tsx",
            }}
          />
        </Tabs.Content>
      </Tabs.ContentGroup>
    </Tabs.Root>
  </Flex>
)

export const Accessibility = async () => (
  <Container>
    <Flex justify="center">
      <Flex gap="20" flex="1" pos="relative">
        <Circle
          size="765px"
          pos="absolute"
          top="-5px"
          left="-50%"
          bottom="-180px"
          opacity="0.1"
          filter="blur(250px)"
          bg="teal.500"
        />
        <Circle
          size="765px"
          pos="absolute"
          top="-70%"
          right="-20%"
          opacity="0.1"
          filter="blur(250px)"
          bg="teal.500"
        />
        <Stack gap="12" flex="1">
          <Intro />
          <Testimonial />
        </Stack>

        <CodePreviewSection />
      </Flex>
    </Flex>
  </Container>
)
