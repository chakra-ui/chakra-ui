import {
  chakra,
  Box,
  Container,
  Text,
  Stack,
  Button,
  Icon,
  LightMode,
  Img,
  Wrap,
  Circle,
} from "@chakra-ui/core"

export default function Support({ sponsors }) {
  return (
    <Box bg="teal.500">
      <Container py="120px" maxW="1200px" px="32px" color="white">
        <Box maxW="560px" mx="auto" textAlign="center" mb="56px">
          <chakra.h2 textStyle="heading-2" mb="4">
            Support Chakra UI 💖
          </chakra.h2>
          <Text opacity={0.7} lineHeight="taller">
            Our maintainers devote their time, effort, and heart to ensure
            Chakra UI keeps getting better. Support us by donating to our
            collective 🙏
          </Text>
        </Box>

        <Stack
          direction={{ base: "column", md: "row" }}
          spacing="6"
          maxW="600px"
          mx="auto"
          bg="white"
          color="gray.800"
          shadow="md"
          rounded="lg"
          p="6"
        >
          <Stack flex="1" isInline spacing="6" pr={{ base: 0, md: "4" }}>
            <Icon h="40px" w="40px" viewBox="0 0 32 32">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M29.1531 6.8877C30.948 9.47379 31.9999 12.614 31.9999 16.0003C31.9999 19.3866 30.948 22.5271 29.1531 25.1129L25.0085 20.9684C25.8225 19.4957 26.2858 17.8019 26.2858 16.0003C26.2858 14.1987 25.8225 12.5052 25.0085 11.0325L29.1531 6.8877Z"
                fill="#8FC7FF"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M25.1126 2.84685L20.9678 6.99138C19.4951 6.17745 17.8016 5.71417 16 5.71417C10.3194 5.71417 5.71418 10.3194 5.71418 16C5.71418 21.6806 10.3194 26.2858 16 26.2858C17.8016 26.2858 19.4951 25.8226 20.9678 25.0086L25.1126 29.1532C22.5265 30.948 19.3863 32 16 32C7.16352 32 0 24.8365 0 16C0 7.16351 7.16352 0 16 0C19.3863 0 22.5265 1.05197 25.1126 2.84685Z"
                fill="#297EFF"
              />
            </Icon>
            <Box flex="1">
              <Text fontSize="lg" fontWeight="bold" mt="-1">
                Open Collective
              </Text>
              <Text opacity={0.7}>Sponsor the Chakra UI maintainers</Text>
            </Box>
          </Stack>
          <LightMode>
            <Button
              w={{ base: "100%", md: "auto" }}
              alignSelf="center"
              as="a"
              minW="7rem"
              colorScheme="teal"
              href="https://opencollective.com/chakra-ui"
              rel="noopener"
              target="_blank"
            >
              Sponsor
            </Button>
          </LightMode>
        </Stack>

        <Stack
          direction={{ base: "column", md: "row" }}
          maxW="600px"
          mt="6"
          mx="auto"
          bg="white"
          color="gray.800"
          shadow="md"
          rounded="lg"
          p="6"
        >
          <Stack flex="1" isInline spacing="6" pr={{ base: 0, md: "4" }}>
            <Icon w="40px" h="40px" viewBox="0 0 569 546">
              <g>
                <circle
                  cx="362.589996"
                  cy="204.589996"
                  r="204.589996"
                  fill="#f96854"
                />
                <rect
                  fill="#052d49"
                  height="545.799988"
                  width="100"
                  x="0"
                  y="0"
                />
              </g>
            </Icon>
            <Box flex="1">
              <Text fontSize="lg" fontWeight="bold" mt="-1">
                Patreon
              </Text>
              <Text opacity={0.7}>Sponsor the creator, Segun Adebayo</Text>
            </Box>
          </Stack>
          <LightMode>
            <Button
              w={{ base: "100%", md: "auto" }}
              alignSelf="center"
              as="a"
              minW="7rem"
              colorScheme="teal"
              href="https://www.patreon.com/segunadebayo"
              rel="noopener"
              target="_blank"
            >
              Sponsor
            </Button>
          </LightMode>
        </Stack>

        <Box maxW="600px" mx="auto" textAlign="center">
          <chakra.p textStyle="caps" mb="8" mt="4rem">
            Organization Sponsors 🏦
          </chakra.p>
          <Wrap justify="center">
            {sponsors.companies.map((i) => (
              <Circle
                key={i.MemberId}
                as="a"
                href={i.website}
                target="_blank"
                rel="noopener"
                size="80px"
                bg="white"
                shadow="lg"
              >
                <Img
                  rounded="full"
                  w="56px"
                  h="56px"
                  alt={i.name}
                  key={i.MemberId}
                  src={i.image}
                  loading="lazy"
                />
              </Circle>
            ))}
          </Wrap>

          <chakra.p mb="8" mt="4rem" textStyle="caps">
            Individual Sponsors 🥇
          </chakra.p>
          <Wrap justify="center">
            {sponsors.individuals.map((i) => (
              <Img
                rounded="full"
                w="40px"
                h="40px"
                objectFit="cover"
                alt={i.name}
                key={i.MemberId}
                src={i.image}
                loading="lazy"
              />
            ))}
          </Wrap>
        </Box>
      </Container>
    </Box>
  )
}
