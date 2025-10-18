"use client"

import { Box, Carousel, HStack, Image, VStack } from "@chakra-ui/react"
import { LuArrowLeft, LuArrowRight } from "react-icons/lu"

const items = Array.from(
  { length: 5 },
  (_, i) => `https://picsum.photos/seed/${i + 1}/500/300`,
)

export const CarouselBasic = () => {
  return (
    <VStack align="stretch" py={8} w="full" gap={6}>
      <Box maxW="900px" mx="auto" w="full">
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
                />
              </Carousel.Item>
            ))}
          </Carousel.ItemGroup>
          <Carousel.Navs
            leftIcon={<LuArrowLeft />}
            rightIcon={<LuArrowRight />}
          />
          <HStack justify="center" mt={4}>
            <Carousel.Indicators count={items.length} />
          </HStack>
        </Carousel.Root>
      </Box>
    </VStack>
  )
}

export default CarouselBasic
