import {
  chakra,
  Box,
  SimpleGrid,
  Wrap,
  Img,
  Container,
  BoxProps,
  Flex,
  Stack,
  Text,
} from "@chakra-ui/core"
import { FaDiscord } from "react-icons/fa"
import { FiDownload, FiGithub, FiUsers } from "react-icons/fi"

type StatBoxProps = BoxProps & {
  icon?: React.ElementType
  title: string
  description: string
}

const StatBox = (props: StatBoxProps) => {
  const { icon: StatIcon, title, description, ...rest } = props
  return (
    <Flex
      direction="column"
      align={{ base: "center", md: "flex-start" }}
      pl={{ base: 0, md: "8" }}
      borderLeft="2px solid"
      borderLeftColor="yellow.200"
      {...rest}
    >
      <Box
        fontSize={{ base: "4rem", md: "6.75rem" }}
        lineHeight="1em"
        mb="20px"
      >
        {title}
      </Box>
      <Stack isInline align="center">
        <StatIcon size="24px" />
        <Text>{description}</Text>
      </Stack>
    </Flex>
  )
}

export default function Growth({ members }) {
  return (
    <Box as="section" bg="teal.500">
      <Container py="7.5rem" maxW="1280px" color="white">
        <Box maxW="760px" mx="auto" textAlign="center" mb="56px">
          <chakra.h2 textStyle="heading" mb="5">
            Chakra is growing quickly
          </chakra.h2>
          <chakra.p opacity={0.7} fontSize="lg">
            We're dedicated to improving the experience and performance of
            Chakra UI
          </chakra.p>
        </Box>
        <SimpleGrid
          columns={{ base: 1, md: 2 }}
          maxW="880px"
          mx="auto"
          spacing="4rem"
          px={{ md: 12 }}
        >
          <StatBox
            icon={FiDownload}
            title="140k"
            description="Downloads per month"
          />
          <StatBox icon={FiGithub} title="9.9k" description="Github stars" />
          <StatBox icon={FiUsers} title="6" description="Core contributors" />
          <StatBox
            icon={FaDiscord}
            title="450+"
            description="Discord members"
          />
        </SimpleGrid>

        <Box mt="5rem" textAlign="center">
          <chakra.p mb="48px" textStyle="caps">
            Chakra Heroes 🥇
          </chakra.p>
          <Wrap spacing="4" justify="center" maxW="660px" mx="auto">
            {members.map((i) => (
              <Img
                key={i.login}
                width="80px"
                height="80px"
                rounded="full"
                alt={i.name}
                src={i.avatar_url}
                loading="lazy"
              />
            ))}
          </Wrap>
        </Box>
      </Container>
    </Box>
  )
}
