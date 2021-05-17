import {
  useColorModeValue,
  Box,
  Badge,
  Flex,
  HStack,
  Image,
} from "@chakra-ui/react"
import { StarIcon } from "@chakra-ui/icons"
import { Property } from "../interfaces/Property"

export const PropertySummary = ({ property }: { property: Property }) => {
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

        <Flex mt="2" alignItems="center">
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
        </Flex>
      </Box>
    </Box>
  )
}
