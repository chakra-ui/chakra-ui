"use client"

import { Carousel, HStack, IconButton, Image, VStack } from "@chakra-ui/react"
import { useState } from "react"
import { FaPause, FaPlay } from "react-icons/fa"

const images = Array.from(
  { length: 5 },
  (_, i) => `https://picsum.photos/seed/${i + 1}/500/300`,
)

export const CarouselWithAutoplay = () => {
  const [isPlaying, setIsPlaying] = useState(true)

  return (
    <VStack gap={4} align="center" py={6}>
      <HStack>
        <IconButton
          size="sm"
          variant="subtle"
          colorScheme="gray"
          aria-label={isPlaying ? "Pause autoplay" : "Play autoplay"}
          onClick={() => setIsPlaying(!isPlaying)}
        >
          {isPlaying ? <FaPause size={14} /> : <FaPlay size={14} />}
        </IconButton>
      </HStack>

      <Carousel.Root
        autoplay={isPlaying}
        slideCount={images.length}
        mx="auto"
        maxW="600px"
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

        <Carousel.IndicatorGroup mt={2}>
          {images.map((_, index) => (
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

export default CarouselWithAutoplay
