import {
  Center,
  Circle,
  Container,
  Heading,
  Icon,
  Span,
  Stack,
  Text,
  Wrap,
} from "@chakra-ui/react"
import {
  BlitzIcon,
  GatsbyIcon,
  NextJSIcon,
  RedwoodJSIcon,
  RemixJSIcon,
  ViteIcon,
} from "./icons"

const Intro = () => (
  <Stack gap={{ base: "4", md: "8" }} align="center">
    <Heading
      maxW="lg"
      textStyle={{ base: "3xl", md: "5xl" }}
      fontWeight="bold"
      textAlign="center"
    >
      Works with your favorite application{" "}
      <Span
        color="teal.500"
        pos="relative"
        px="2"
        display="inline-block"
        _before={{
          pos: "absolute",
          content: "''",
          w: "full",
          h: "full",
          bg: "teal.500/10",
          bottom: "-3px",
          left: "0",
          borderRight: "solid 1.5px",
          borderColor: "currentColor",
        }}
      >
        framework
      </Span>
    </Heading>

    <Text
      maxW="lg"
      textStyle={{ base: "lg", md: "2xl" }}
      fontWeight="medium"
      textAlign="center"
      color="gray.400"
    >
      Chakra provides a consistent developer experience for most modern
      frameworks
    </Text>
  </Stack>
)

const FRAMEWORKS = [
  { title: "Next JS", icon: NextJSIcon },
  { title: "Vite", icon: ViteIcon },
  { title: "Remix JS", icon: RemixJSIcon },
  { title: "Gatsby", icon: GatsbyIcon },
  { title: "Redwood JS", icon: RedwoodJSIcon },
]

const FrameworksList = () => (
  <Wrap
    justify="center"
    gap="0"
    css={{
      "& > *": {
        "--border-width": "0.5px",
        border: "solid var(--border-width)",
        borderColor: "#001B18",
        mr: "calc(var(--border-width) * -1)",
        mb: "calc(var(--border-width) * -1)",
      },
    }}
  >
    {FRAMEWORKS.map((framework) => (
      <Center
        p={{ base: "6", md: "10" }}
        key={framework.title}
        title={framework.title}
      >
        <Icon fontSize={{ base: "3xl", md: "6xl" }} asChild>
          <framework.icon />
        </Icon>
      </Center>
    ))}
  </Wrap>
)

export const Frameworks = async () => {
  return (
    <Container>
      <Stack
        gap={{ base: "10", md: "20" }}
        pos="relative"
        align="center"
        maxW="100%"
      >
        <Icon
          asChild
          w="245px"
          h="342px"
          pos="absolute"
          top="-28"
          left="-20"
          mdDown={{ display: "none" }}
        >
          <BlitzIcon />
        </Icon>
        <Intro />
        <FrameworksList />
        <Circle
          size="765px"
          rounded="100%"
          opacity="0.1"
          filter="blur(250px)"
          bg="teal.500"
          pos="absolute"
          top="-80%"
          left="-25%"
          mdDown={{ display: "none" }}
        />
      </Stack>
    </Container>
  )
}
