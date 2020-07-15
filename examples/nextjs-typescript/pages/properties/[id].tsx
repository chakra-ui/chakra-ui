import {
  Box,
  Flex,
  SimpleGrid,
  Heading,
  Container,
  Badge,
  Image,
  useColorModeValue,
  HStack,
  Wrap,
} from "@chakra-ui/core"
import { StarIcon } from "@chakra-ui/icons"
import { Layout } from "../../components/Layout"
import { properties } from "../../utils/sample-data"
import { GetStaticProps, GetStaticPaths } from "next"

const PropertySummary = ({ property }: any) => {
  const textColor = useColorModeValue("gray.600", "gray.400")
  return (
    <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
      <Image src={property.imageUrl} alt={property.imageAlt} />

      <Box p="6">
        <Box d="flex" alignItems="baseline">
          {property.isNew && (
            <Badge borderRadius="full" px="2" colorScheme="teal" mr="2">
              New
            </Badge>
          )}
          <Box
            color={textColor}
            fontWeight="semibold"
            letterSpacing="wide"
            fontSize="xs"
            textTransform="uppercase"
          >
            {property.beds} beds &bull; {property.baths} baths
          </Box>
        </Box>

        <Box
          mt="1"
          fontWeight="semibold"
          as="h4"
          lineHeight="tight"
          isTruncated
        >
          {property.title}
        </Box>

        <Box>
          {property.formattedPrice}
          <Box as="span" color={textColor} fontSize="sm">
            / wk
          </Box>
        </Box>

        <Box d="flex" mt="2" alignItems="center">
          <HStack spacing={1}>
            {Array(5)
              .fill("")
              .map((_, i) => (
                <StarIcon
                  key={i}
                  color={i < property.rating ? "teal.500" : "gray.300"}
                />
              ))}
          </HStack>
          <Box as="span" ml="2" color={textColor} fontSize="sm">
            {property.reviewCount} reviews
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

const PropertyPage = ({ item }) => (
  <Layout title="Next.js + TypeScript example">
    <Heading mb={2}>{item.title}</Heading>
    <Box d="flex" alignItems="baseline">
      {item.isNew && (
        <Badge borderRadius="full" px="2" colorScheme="teal" mr="2">
          New
        </Badge>
      )}
      <Box
        mb={6}
        fontWeight="semibold"
        letterSpacing="wide"
        fontSize="xs"
        textTransform="uppercase"
      >
        {item.beds} beds &bull; {item.baths} baths
      </Box>
    </Box>
    <Image src={item.imageUrl} alt={item.imageAlt} borderRadius="md" />
  </Layout>
)

export const getStaticPaths: GetStaticPaths = async () => {
  // Get the paths we want to pre-render based on properties
  const paths = properties.map((property) => ({
    params: { id: property.id },
  }))

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const id = params?.id
    const item = properties.find((data) => data.id === id)
    // By returning { props: item }, the StaticPropsDetail component
    // will receive `item` as a prop at build time
    return { props: { item } }
  } catch (err) {
    return { props: { errors: err.message } }
  }
}

export default PropertyPage
