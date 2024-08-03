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
      "--size": "sizes.14",
    }}
    w="var(--size)"
    h="var(--size)"
    top="calc(var(--size)*-0.5)"
    left="50%"
    transform="translateX(-50%)"
    pos="absolute"
  >
    <LogoBlitzIcon />
  </Center>
)

const Intro = () => (
  <Heading size="5xl" fontWeight="bold">
    Build faster with
    <br />
    Chakra Pro 💎
  </Heading>
)

const Description = () => (
  <Text textStyle="2xl" maxW="md" color="gray.400">
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
      py="32"
      borderTop="solid 1px"
      borderColor="#001B18"
      pos="relative"
    >
      <Logo />
      <Stack gap="28">
        <Container>
          <Stack gap="6">
            <HStack gap="4" color="teal.500">
              <BlitzFillIcon />
              <Text fontWeight="bold">Ready made templates </Text>
            </HStack>

            <HStack justify="space-between" gap="20">
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
