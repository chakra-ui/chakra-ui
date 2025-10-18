"use client"

import { Carousel, Image } from "@chakra-ui/react"

const images = Array.from(
  { length: 5 },
  (_, i) => `https://picsum.photos/seed/${i + 1}/500/300`,
)

export const CarouselWithLoop = () => {
  return (
    <Carousel.Root
      loop
      defaultPage={0}
      slideCount={images.length}
      maxW="full"
      mx="auto"
    >
      <Carousel.ItemGroup>
        {images.map((src, index) => (
          <Carousel.Item key={index} index={index}>
            <Image
              src={src}
              alt={`Slide ${index + 1}`}
              w="100%"
              h="300px"
              objectFit="cover"
              borderRadius="md"
            />
          </Carousel.Item>
        ))}
      </Carousel.ItemGroup>

      <Carousel.Control>
        <Carousel.PrevTrigger />
        <Carousel.NextTrigger />
      </Carousel.Control>

      <Carousel.Indicators mt={4} count={images.length} />
    </Carousel.Root>
  )
}

export default CarouselWithLoop
