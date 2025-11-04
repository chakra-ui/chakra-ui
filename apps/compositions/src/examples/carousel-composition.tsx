import {
  Badge,
  Box,
  CardRoot,
  Carousel,
  HStack,
  Heading,
  IconButton,
  Image,
  RatingGroup,
  Text,
  VStack,
} from "@chakra-ui/react"
import { LuChevronLeft, LuChevronRight, LuHeart } from "react-icons/lu"

export const CarouselComposition = () => {
  return (
    <Carousel.Root slideCount={properties.length} slidesPerPage={5} gap="4">
      <CarouselControls title="Popular homes in Cape Town" />

      <Carousel.ItemGroup>
        {properties.map((property, index) => (
          <Carousel.Item key={property.id} index={index}>
            <PropertyCard property={property} showBadge={index < 4} />
          </Carousel.Item>
        ))}
      </Carousel.ItemGroup>
    </Carousel.Root>
  )
}

interface PropertyCardProps {
  property: Property
  showBadge: boolean
}

const PropertyCard = ({ property, showBadge }: PropertyCardProps) => (
  <CardRoot w="full" border="none" shadow="none" p="0">
    <Box position="relative">
      <Image
        src={property.image}
        alt={property.title}
        borderRadius="md"
        w="full"
        h="200px"
        objectFit="cover"
      />
      <HStack
        position="absolute"
        top="0"
        w="full"
        px="3"
        py="2"
        justify="space-between"
      >
        {showBadge ? (
          <Badge p="2" rounded="full" fontSize="xs">
            Guest favorite
          </Badge>
        ) : (
          <Box />
        )}
        <IconButton
          size="sm"
          variant="ghost"
          rounded="full"
          _hover={{
            transform: "scale(1.15)",
            color: "red.400",
            bg: "gray.100",
          }}
          aria-label="Add to favorites"
        >
          <LuHeart />
        </IconButton>
      </HStack>
    </Box>

    <VStack align="start" gap={1} mt="2">
      <Text fontWeight="semibold" fontSize="sm">
        {property.title}
      </Text>
      <HStack gap="1" color="fg.muted" fontSize="xs">
        <Text>
          ${property.price} for {property.nights} nights
        </Text>
        <Box as="span">·</Box>
        <HStack gap="1">
          <RatingGroup.Root size="xs" value={property.rating}>
            <RatingGroup.Item index={1}>
              <RatingGroup.ItemIndicator colorPalette="yellow" />
            </RatingGroup.Item>
          </RatingGroup.Root>
          <Text>{property.rating.toFixed(2)}</Text>
        </HStack>
      </HStack>
    </VStack>
  </CardRoot>
)

interface CarouselControlsProps {
  title: string
}

const CarouselControls = ({ title }: CarouselControlsProps) => (
  <HStack justify="space-between">
    <Heading size="sm">{title}</Heading>
    <HStack>
      <Carousel.PrevTrigger asChild>
        <IconButton size="xs" variant="subtle" rounded="full">
          <LuChevronLeft />
        </IconButton>
      </Carousel.PrevTrigger>
      <Carousel.NextTrigger asChild>
        <IconButton size="xs" variant="subtle" rounded="full">
          <LuChevronRight />
        </IconButton>
      </Carousel.NextTrigger>
    </HStack>
  </HStack>
)

const properties = [
  {
    id: 1,
    title: "Apartment in Cape Town City Centre",
    price: 152,
    nights: 2,
    rating: 4.92,
    image:
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80",
  },
  {
    id: 2,
    title: "Apartment in Camps Bay",
    price: 296,
    nights: 2,
    rating: 4.99,
    image:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
  },
  {
    id: 3,
    title: "Apartment in Hout Bay",
    price: 257,
    nights: 2,
    rating: 4.94,
    image:
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80",
  },
  {
    id: 4,
    title: "Condo in Sea Point",
    price: 132,
    nights: 2,
    rating: 4.87,
    image:
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80",
  },
  {
    id: 5,
    title: "Apartment in Cape Town City Centre",
    price: 200,
    nights: 2,
    rating: 4.83,
    image:
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80",
  },
  {
    id: 6,
    title: "Apartment in Cape Town City Centre",
    price: 247,
    nights: 2,
    rating: 4.96,
    image:
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80",
  },
  {
    id: 7,
    title: "Apartment in Cape Town City Centre",
    price: 135,
    nights: 2,
    rating: 4.81,
    image:
      "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=800&q=80",
  },
  {
    id: 8,
    title: "Villa in Constantia",
    price: 450,
    nights: 2,
    rating: 4.98,
    image:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
  },
]

type Property = (typeof properties)[number]
