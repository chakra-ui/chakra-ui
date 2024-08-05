import { BlitzFillIcon } from "@/app/page/icons"
import { LogoBlitzIcon } from "@/components/logo"
import {
  Button,
  Center,
  Container,
  HStack,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react"
import { HiArrowRight } from "react-icons/hi"

const Logo = () => (
  <Center
    rounded="lg"
    bg="teal.500"
    css={{
      "--size": { base: "sizes.10", md: "sizes.16" },
    }}
    w="var(--size)"
    h="var(--size)"
    top="calc(var(--size)*-0.5)"
    left="50%"
    transform="translateX(-50%)"
    pos="absolute"
  >
    <LogoBlitzIcon fontSize={{ base: "2xl", md: "4xl" }} />
  </Center>
)

const Intro = () => (
  <Heading textStyle={{ base: "3xl", md: "5xl" }} fontWeight="bold">
    Build faster with
    <br />
    Chakra Pro 💎
  </Heading>
)

const Description = () => (
  <Text textStyle={{ base: "lg", md: "2xl" }} maxW="md" color="gray.400">
    Beautiful and responsive React components to build your application or
    marketing pages quicker.
  </Text>
)

const LearnMore = () => (
  <Button asChild colorPalette="teal" size="lg" bg="teal.500" color="black">
    <a
      target="_blank"
      rel="noopener"
      href="https://pro.chakra-ui.com/?utm_source=chakra-ui.com&utm_medium=homepage-ad"
    >
      Learn More
      <HiArrowRight />
    </a>
  </Button>
)

export const Templates = () => {
  return (
    <Stack
      gap="16"
      py={{ base: "16", md: "32" }}
      borderTop="solid 1px"
      borderColor="#001B18"
      pos="relative"
    >
      <Logo />
      <Stack gap="28">
        <Container>
          <Stack gap={{ base: "3", md: "6" }}>
            <HStack gap="4" color="teal.500">
              <BlitzFillIcon />
              <Text fontWeight="bold">Ready made templates </Text>
            </HStack>

            <HStack
              justify="space-between"
              align={{ base: "start", md: "center" }}
              gap={{ base: "5", md: "20" }}
              flexDir={{ base: "column", md: "row" }}
            >
              <Intro />
              <Description />
              <LearnMore />
            </HStack>
          </Stack>
        </Container>
      </Stack>
      <Image src="/chakra-ui-ad.png" alt="Chakra UI Pro" />
    </Stack>
  )
}
