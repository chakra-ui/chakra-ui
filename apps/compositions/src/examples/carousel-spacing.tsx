"use client"

import { Carousel, Image, Slider, Text, VStack } from "@chakra-ui/react"
import { useState } from "react"

const items = [
  "https://picsum.photos/400/300?random=1",
  "https://picsum.photos/400/300?random=2",
  "https://picsum.photos/400/300?random=3",
  "https://picsum.photos/400/300?random=4",
  "https://picsum.photos/400/300?random=5",
]

export const CarouselSpacing = () => {
  const [spacing, setSpacing] = useState([4])

  return (
    <VStack gap={6} align="center" py={4}>
      <VStack gap={2}>
        <Text fontSize="sm" fontWeight="medium">
          Adjust slide spacing
        </Text>
        <Slider.Root
          min={0}
          max={16}
          step={1}
          value={spacing}
          onValueChange={(e) => setSpacing(e.value)}
          w="240px"
        >
          <Slider.Control>
            <Slider.Track>
              <Slider.Range />
            </Slider.Track>
            <Slider.Thumbs />
          </Slider.Control>
          <Slider.ValueText />
        </Slider.Root>
        <Text fontSize="sm" color="gray.500">
          Current spacing: {spacing[0] * 4}px
        </Text>
      </VStack>
      <Carousel.Root
        defaultPage={0}
        slideCount={items.length}
        slidesPerPage={2}
        slidesPerMove={2}
        spacing={`${spacing[0] * 4}px`}
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
                shadow="sm"
              />
            </Carousel.Item>
          ))}
        </Carousel.ItemGroup>

        <Carousel.Control>
          <Carousel.PrevTrigger />
          <Carousel.NextTrigger />
        </Carousel.Control>
      </Carousel.Root>
    </VStack>
  )
}

export default CarouselSpacing
