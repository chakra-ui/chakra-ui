"use client"

import {
  Box,
  Carousel,
  HStack,
  IconButton,
  Image,
  VStack,
} from "@chakra-ui/react"
import { useState } from "react"
import { LuArrowLeft, LuArrowRight, LuPause, LuPlay } from "react-icons/lu"

const items = Array.from(
  { length: 5 },
  (_, i) => `https://picsum.photos/seed/${i + 1}/500/300`,
)

const AutoplayIcon = ({ running }: { running: boolean }) => {
  return (
    <IconButton aria-label="Toggle autoplay" size="sm" variant="ghost">
      {running ? <LuPause /> : <LuPlay />}
    </IconButton>
  )
}

export const CarouselBasicExplorer = () => {
  const [autoplayRunning, setAutoplayRunning] = useState(true)
  const toggleAutoplay = () => setAutoplayRunning(!autoplayRunning)

  return (
    <VStack align="stretch" gap={8} py={12} maxW="900px" mx="auto">
      <Carousel.Root
        slideCount={items.length}
        maxW="full"
        py="10"
        autoplay={autoplayRunning}
        loop
      >
        <Carousel.ItemGroup>
          {items.map((src, index) => (
            <Box key={index} position="relative">
              <Carousel.Item index={index} asChild>
                <Image
                  src={src}
                  alt={`Slide ${index + 1}`}
                  w="100%"
                  h="200px"
                  objectFit="cover"
                  borderRadius="md"
                />
              </Carousel.Item>
            </Box>
          ))}
        </Carousel.ItemGroup>

        <Carousel.Navs
          leftIcon={<LuArrowLeft />}
          rightIcon={<LuArrowRight />}
        />

        <Box
          position="absolute"
          bottom="var(--carousel-spacing)"
          right="var(--carousel-spacing)"
        >
          <Carousel.AutoplayTrigger onClick={toggleAutoplay}>
            <AutoplayIcon running={autoplayRunning} />
          </Carousel.AutoplayTrigger>
        </Box>

        <HStack justify="center" gap={4} mt={4}>
          <Carousel.Indicators count={items.length} />
        </HStack>
      </Carousel.Root>
    </VStack>
  )
}

export default CarouselBasicExplorer
