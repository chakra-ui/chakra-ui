import {
  Button,
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
// import { DemoCode } from "../demo-code"
import { Blob } from "./blob"
// import { AccessibilityDemo } from "./data/accessibility-demo"
import { BlitzFillIcon } from "./icons"

const Intro = () => (
  <Stack gap={{ base: "4", md: "10" }}>
    <Stack gap={{ base: "3", md: "7" }} align="flex-start">
      <Stack gap={{ base: "3", md: "6" }}>
        <HStack gap="4" color="teal.500">
          <BlitzFillIcon />
          <Text fontWeight="bold">Accessible UI Components</Text>
        </HStack>
        <Heading textStyle={{ base: "3xl", md: "5xl" }} fontWeight="bold">
          Less code. More speed
        </Heading>
      </Stack>
      <Text textStyle={{ base: "lg", md: "2xl" }}>
        Meet the system for modern product development.{" "}
        <Span color="gray.400">
          Streamline issues, projects, and product roadmaps.
        </Span>
      </Text>
    </Stack>
    <Button
      asChild
      colorPalette="teal"
      size={{ base: "md", md: "lg" }}
      bg="teal.500"
      color="black"
      w="fit-content"
      px="8"
    >
      <Link href="/docs/get-started/installation">Start Building</Link>
    </Button>
  </Stack>
)

const Testimonial = () => (
  <Stack
    gap={{ base: "4", md: "10" }}
    pl={{ base: "4", md: "9" }}
    borderLeft="solid 4px"
    borderColor="teal.500"
  >
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
          py="6"
        >
          {/* <AccessibilityDemo /> */}
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
          {/* <DemoCode
            name="accessibility-demo"
            extension="tsx"
            opts={{
              lang: "tsx",
            }}
          /> */}
        </Tabs.Content>
      </Tabs.ContentGroup>
    </Tabs.Root>
  </Flex>
)

export const Accessibility = async () => (
  <Container>
    <Flex justify="center">
      <Flex
        gap={{ base: "10", md: "20" }}
        flex="1"
        pos="relative"
        direction={{ base: "column", md: "row" }}
      >
        <Blob
          width="765px"
          height="765px"
          top="-5px"
          left="-50%"
          bottom="-180px"
        />
        <Blob width="765px" height="765px" top="-70%" right="-20%" />

        <Stack gap={{ base: "6", md: "12" }} flex="1">
          <Intro />
          <Testimonial />
        </Stack>

        <CodePreviewSection />
      </Flex>
    </Flex>
  </Container>
)
