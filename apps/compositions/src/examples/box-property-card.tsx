import { Badge, Box, HStack, Icon, Image, Text } from "@chakra-ui/react"
import { HiStar } from "react-icons/hi"

export const BoxPropertyCard = () => {
  return (
    <Box maxW="sm" borderWidth="1px">
      <Image src={data.imageUrl} alt={data.imageAlt} />

      <Box p="4" spaceY="2">
        <HStack>
          <Badge colorPalette="teal" variant="solid">
            Superhost
          </Badge>
          <HStack gap="1" fontWeight="medium">
            <Icon color="orange.400">
              <HiStar />
            </Icon>
            <Text>
              {data.rating} ({data.reviewCount})
            </Text>
          </HStack>
        </HStack>
        <Text fontWeight="medium" color="fg">
          {data.title}
        </Text>
        <HStack color="fg.muted">
          {data.formattedPrice} • {data.beds} beds
        </HStack>
      </Box>
    </Box>
  )
}

const data = {
  imageUrl: "https://bit.ly/2Z4KKcF",
  imageAlt: "Rear view of modern home with pool",
  beds: 3,
  title: "Modern home in city center in the heart of historic Los Angeles",
  formattedPrice: "$435",
  reviewCount: 34,
  rating: 4.5,
}
