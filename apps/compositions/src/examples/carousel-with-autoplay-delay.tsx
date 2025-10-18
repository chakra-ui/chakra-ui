"use client"

import { Carousel, Image, Slider, Text, VStack } from "@chakra-ui/react"
import { useState } from "react"

const images = Array.from(
  { length: 5 },
  (_, i) => `https://picsum.photos/seed/${i + 1}/500/300`,
)

export const CarouselWithAutoplayDelay = () => {
  const [delay, setDelay] = useState([3000])

  return (
    <VStack gap={6} align="center" py={6}>
      <VStack gap={2}>
        <Text fontSize="sm" fontWeight="medium">
          Adjust delay speed
        </Text>
        <Slider.Root
          min={1000}
          max={8000}
          step={500}
          value={delay}
          onValueChange={(e) => setDelay(e.value)}
          w="260px"
        >
          <Slider.Control>
            <Slider.Track>
              <Slider.Range />
            </Slider.Track>
            <Slider.Thumbs />
          </Slider.Control>
          <Slider.ValueText />
        </Slider.Root>
        <Text fontSize="sm" color="fg.muted">
          Delay: {delay[0] / 1000}s
        </Text>
      </VStack>

      <Carousel.Root
        autoplay={{ delay: delay[0] }}
        slideCount={images.length}
        mx="auto"
        maxW="full"
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
                borderRadius="lg"
                shadow="base"
              />
            </Carousel.Item>
          ))}
        </Carousel.ItemGroup>

        <Carousel.Indicators mt={4} count={images.length} />
      </Carousel.Root>
    </VStack>
  )
}

export default CarouselWithAutoplayDelay
