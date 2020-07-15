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
import NextLink from "next/link"

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

const PostsPage = () => (
  <Layout title="Next.js + TypeScript example">
    <Heading mb={4}>Properties in the city</Heading>
    <Wrap>
      {properties.map((property) => (
        <NextLink href={`/properties/${property.id}`}>
          <a>
            <PropertySummary key={property.id} property={property} />
          </a>
        </NextLink>
      ))}
    </Wrap>
  </Layout>
)

export default PostsPage
