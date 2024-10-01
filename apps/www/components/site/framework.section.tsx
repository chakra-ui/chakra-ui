import { HighlightHeading, Subheading } from "@/components/site/typography"
import {
  Box,
  Container,
  Flex,
  Icon,
  Square,
  Stack,
  VStack,
} from "@chakra-ui/react"
import { Blob } from "./blob"
import {
  BlitzIcon,
  GatsbyIcon,
  NextJSIcon,
  RedwoodJSIcon,
  RemixJSIcon,
  ViteIcon,
} from "./icons"

const FRAMEWORKS = [
  { title: "Next JS", icon: NextJSIcon },
  { title: "Vite", icon: ViteIcon },
  { title: "Remix JS", icon: RemixJSIcon },
  { title: "Gatsby", icon: GatsbyIcon },
  { title: "Redwood JS", icon: RedwoodJSIcon },
]

const FrameworksList = () => (
  <Flex
    wrap="wrap"
    justify="center"
    css={{
      "& > *": {
        "--border-width": "0.5px",
        border: "solid var(--border-width)",
        borderColor: { _light: "inherit", _dark: "#001B18" },
        mr: "calc(var(--border-width) * -1)",
        mb: "calc(var(--border-width) * -1)",
      },
    }}
  >
    {FRAMEWORKS.map((framework) => (
      <Square
        size={{ base: "100px", md: "160px" }}
        key={framework.title}
        title={framework.title}
      >
        <Icon fontSize="4xl" asChild>
          <framework.icon />
        </Icon>
      </Square>
    ))}
  </Flex>
)

export const FrameworkSection = () => {
  return (
    <Box py="20">
      <Container>
        <Stack gap={{ base: "10", md: "20" }} align="center">
          <Icon
            asChild
            color="fg.inverted"
            w="245px"
            h="342px"
            pos="absolute"
            top="-28"
            left="-20"
            hideBelow="md"
          >
            <BlitzIcon />
          </Icon>
          <VStack gap={{ base: "4", md: "8" }} textAlign="center">
            <HighlightHeading query="framework" maxW="xl">
              Works with your favorite application framework
            </HighlightHeading>
            <Subheading maxW="md">
              Chakra provides a consistent developer experience for most modern
              frameworks
            </Subheading>
          </VStack>
          <FrameworksList />
        </Stack>
        <Blob width="2000px" height="2000px" top="-90%" left="-50%" />
      </Container>
    </Box>
  )
}
