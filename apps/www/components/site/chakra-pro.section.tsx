import { LogoBlitzIcon } from "@/components/logo"
import {
  BlitzHeading,
  HighlightHeading,
  Subheading,
} from "@/components/site/typography"
import {
  Box,
  Button,
  Center,
  Container,
  Image,
  Span,
  Stack,
} from "@chakra-ui/react"
import { HiArrowRight } from "react-icons/hi"

const Logo = () => (
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
)

export const ChakraProSection = () => {
  return (
    <Box py="20">
      <Stack
        gap="16"
        pt={{ base: "16", md: "32" }}
        borderTopWidth="1px"
        borderColor={{ _light: "inherit", _dark: "#001B18" }}
        pos="relative"
        bgGradient="to-b"
        gradientFrom="transparent"
        gradientTo="teal.500/20"
      >
        <Logo />
        <Stack gap="28">
          <Container>
            <Stack gap="6" align={{ base: "center", xl: "start" }}>
              <BlitzHeading>Ready made templates</BlitzHeading>
              <Stack
                justify="space-between"
                gap={{ base: "10", xl: "20" }}
                align="center"
                textAlign={{ base: "center", xl: "start" }}
                direction={{ base: "column", xl: "row" }}
              >
                <HighlightHeading
                  as="h2"
                  query="faster"
                  fontWeight="bold"
                  maxW={{ md: "lg" }}
                  flexShrink="0"
                >
                  Build even faster with Chakra Pro 💎
                </HighlightHeading>

                <Subheading maxW={{ md: "md" }} hideBelow="md">
                  Premade components and pages for application, marketing and
                  ecommerce. <Span color="fg">Beautiful and responsive.</Span>
                </Subheading>

                <Button asChild colorPalette="teal" size="lg">
                  <a
                    target="_blank"
                    rel="noopener"
                    href="https://pro.chakra-ui.com/?utm_source=chakra-ui.com&utm_medium=homepage-ad"
                  >
                    Explore Templates
                    <HiArrowRight />
                  </a>
                </Button>
              </Stack>
            </Stack>
          </Container>
        </Stack>
        <Image src="/chakra-ui-ad.png" alt="Chakra UI Pro" mb="-4" />
      </Stack>
    </Box>
  )
}
