"use client"

import { Carousel, HStack, Image, Text, VStack } from "@chakra-ui/react"
import { Switch } from "compositions/ui/switch"
import { useState } from "react"
import { LuArrowLeft, LuArrowRight } from "react-icons/lu"

const images = Array.from(
  { length: 5 },
  (_, i) => `https://picsum.photos/seed/${i + 1}/500/300`,
)

export const CarouselWithMouseDrag = () => {
  const [isDraggable, setIsDraggable] = useState(false)

  return (
    <VStack gap={6} align="center" py={4}>
      <HStack gap={2} align="center">
        <Text fontSize="md" fontWeight="medium">
          Allow mouse drag
        </Text>
        <Switch
          checked={isDraggable}
          onCheckedChange={(details) => setIsDraggable(details.checked)}
        />
      </HStack>
      <Carousel.Root
        allowMouseDrag={isDraggable}
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
                shadow="sm"
              />
            </Carousel.Item>
          ))}
        </Carousel.ItemGroup>

        <Carousel.Navs
          leftIcon={<LuArrowLeft />}
          rightIcon={<LuArrowRight />}
        />
        <Carousel.Indicators count={images.length} />
      </Carousel.Root>
    </VStack>
  )
}

export default CarouselWithMouseDrag
