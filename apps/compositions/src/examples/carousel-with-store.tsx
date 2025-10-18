"use client"

import {
  Button,
  Carousel,
  HStack,
  Image,
  VStack,
  useCarousel,
} from "@chakra-ui/react"

const items = Array.from(
  { length: 5 },
  (_, i) => `https://picsum.photos/seed/store-${i + 1}/600/300`,
)

export const CarouselWithStore = () => {
  const carousel = useCarousel({
    slideCount: items.length,
    allowMouseDrag: true,
  })

  return (
    <VStack gap={8} align="stretch" py={8} maxW="800px" mx="auto">
      <Carousel.RootProvider value={carousel}>
        <Carousel.ItemGroup>
          {items.map((src, index) => (
            <Carousel.Item key={index} index={index}>
              <Image
                src={src}
                alt={`Slide ${index + 1}`}
                w="100%"
                h="400px"
                objectFit="cover"
                borderRadius="lg"
                shadow="sm"
              />
            </Carousel.Item>
          ))}
        </Carousel.ItemGroup>

        <HStack justify="center" gap={4} my={8}>
          <Button
            size="md"
            onClick={() => carousel.scrollPrev()}
            disabled={!carousel.canScrollPrev}
          >
            Previous
          </Button>
          <Button
            size="md"
            onClick={() => carousel.scrollNext()}
            disabled={!carousel.canScrollNext}
          >
            Next
          </Button>
          <Button
            size="md"
            variant="outline"
            onClick={() => carousel.scrollToIndex(2)}
          >
            Go to Slide 3
          </Button>
        </HStack>

        <Carousel.Indicators mt={4} count={items.length} />
      </Carousel.RootProvider>
    </VStack>
  )
}

export default CarouselWithStore
