import {
  useColorModeValue,
  chakra,
  Box,
  Container,
  Grid,
  Flex,
  Text,
  Heading,
  Icon,
} from "@chakra-ui/core"
import { AiFillThunderbolt } from "react-icons/ai"
import { FaDiscord } from "react-icons/fa"
import { IoMdMoon } from "react-icons/io"
import { MdAccessibility, MdPalette, MdGrain } from "react-icons/md"

const Feature = ({ title, icon, children, ...props }) => {
  return (
    <Box
      bg={useColorModeValue("white", "gray.700")}
      rounded="12px"
      shadow="base"
      p="40px"
      {...props}
    >
      <Flex
        rounded="full"
        w="12"
        h="12"
        bg="teal.500"
        align="center"
        justify="center"
      >
        <Icon fontSize="24px" color="white" as={icon} />
      </Flex>
      <Heading as="h3" size="md" fontWeight="semibold" mt="1em" mb="0.5em">
        {title}
      </Heading>
      <Text fontSize="lg" opacity={0.7}>
        {children}
      </Text>
    </Box>
  )
}

export default function DesignSystem() {
  return (
    <Box as="section" pt="240px" bg={useColorModeValue("gray.50", "gray.900")}>
      <Container py="120px" maxW="1280px">
        <Box maxW="760px" mx="auto" textAlign="center" mb="56px">
          <chakra.h2 textStyle="heading" mb="5">
            An experience you'd expect from a design system.
          </chakra.h2>
          <chakra.p opacity={0.7} fontSize="lg">
            Opinionated and designed for daily use.
          </chakra.p>
        </Box>
        <Grid
          templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(3, 1fr)" }}
          gap={10}
          px={{ md: 12 }}
        >
          <Feature icon={MdAccessibility} title="Accessible">
            Chakra UI strictly follows WAI-ARIA standards for all components.
          </Feature>
          <Feature icon={MdPalette} title="Themeable">
            Customize any part of our components to match your design needs.
          </Feature>
          <Feature icon={MdGrain} title="Composable">
            Designed with composition in mind. Compose new components with ease.
          </Feature>
          <Feature icon={IoMdMoon} title="Light and Dark UI">
            Optimized for multiple color modes. Use light or dark, your choice.
          </Feature>
          <Feature icon={AiFillThunderbolt} title="Developer Experience">
            Guaranteed to boost your productivity when building your app or
            website.
          </Feature>
          <Feature icon={FaDiscord} title="Active Community">
            We're a team of active maintainer ready to help you whenver you
            need.
          </Feature>
        </Grid>
      </Container>
    </Box>
  )
}
