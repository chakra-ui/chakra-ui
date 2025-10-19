"use client"

import { Box, Carousel, Image, VStack } from "@chakra-ui/react"
import { useState } from "react"
import { LuArrowLeft, LuArrowRight } from "react-icons/lu"

const items = Array.from(
  { length: 5 },
  (_, i) => `https://picsum.photos/seed/${i + 1}/500/300`,
)

export const CarouselWithThumbnails = () => {
  const [current, setCurrent] = useState(0)

  return (
    <VStack align="stretch" py={8} w="full" gap={6} maxW="900px" mx="auto">
      <Carousel.Root
        page={current}
        slideCount={items.length}
        maxW="full"
        mx="auto"
        onPageChange={(details) => setCurrent(details.page)}
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
              />
            </Carousel.Item>
          ))}
        </Carousel.ItemGroup>

        <Carousel.Navs
          leftIcon={<LuArrowLeft />}
          rightIcon={<LuArrowRight />}
        />

        <Carousel.IndicatorGroup justifyContent="center" mt={4} gap={2}>
          {items.map((src, index) => (
            <Box
              key={index}
              w="16"
              h="12"
              borderRadius="md"
              overflow="hidden"
              border={current === index ? "2px solid" : "2px solid transparent"}
              borderColor={current === index ? "fg" : "transparent"}
              cursor="pointer"
              onClick={() => setCurrent(index)}
            >
              <Image
                src={src}
                alt={`Thumbnail ${index + 1}`}
                w="100%"
                h="100%"
                objectFit="cover"
              />
            </Box>
          ))}
        </Carousel.IndicatorGroup>
      </Carousel.Root>
    </VStack>
  )
}

export default CarouselWithThumbnails
