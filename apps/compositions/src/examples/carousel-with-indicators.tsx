"use client"

import { Carousel, Image, VStack } from "@chakra-ui/react"

const items = [
  "https://picsum.photos/400/300?random=1",
  "https://picsum.photos/400/300?random=2",
  "https://picsum.photos/400/300?random=3",
  "https://picsum.photos/400/300?random=4",
  "https://picsum.photos/400/300?random=5",
]

export const CarouselWithIndicators = () => {
  return (
    <VStack gap={4} align="center" py={4}>
      <Carousel.Root
        defaultPage={0}
        slideCount={items.length}
        maxW="full"
        mx="auto"
      >
        <Carousel.ItemGroup>
          {items.map((src, index) => (
            <Carousel.Item key={index} index={index}>
              <Image
                src={src}
                alt={`Slide ${index + 1}`}
                w="100%"
                h="300px"
                objectFit="cover"
                borderRadius="md"
                shadow="sm"
              />
            </Carousel.Item>
          ))}
        </Carousel.ItemGroup>

        <Carousel.Control>
          <Carousel.PrevTrigger />
          <Carousel.NextTrigger />
        </Carousel.Control>

        <Carousel.IndicatorGroup>
          {items.map((_, index) => (
            <Carousel.Indicator
              key={index}
              index={index}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </Carousel.IndicatorGroup>
      </Carousel.Root>
    </VStack>
  )
}

export default CarouselWithIndicators
