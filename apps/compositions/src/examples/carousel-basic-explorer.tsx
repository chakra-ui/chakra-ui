"use client"

import { Box, Carousel, IconButton, Image, VStack } from "@chakra-ui/react"
import { useState } from "react"
import { LuArrowLeft, LuArrowRight, LuPause, LuPlay } from "react-icons/lu"

const items = Array.from(
  { length: 5 },
  (_, i) => `https://picsum.photos/seed/${i + 1}/500/300`,
)

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
        spacing="20px"
      >
        <Carousel.ItemGroup>
          {items.map((src, index) => (
            <Carousel.Item index={index} key={index}>
              <Image
                src={src}
                alt={`Slide ${index + 1}`}
                w="100%"
                h="200px"
                objectFit="cover"
                borderRadius="md"
              />
            </Carousel.Item>
          ))}
        </Carousel.ItemGroup>

        <Box
          position="absolute"
          bottom="var(--carousel-spacing)"
          right="var(--carousel-spacing)"
        >
          <IconButton
            as={Carousel.AutoplayTrigger}
            aria-label="Toggle autoplay"
            size="sm"
            variant="ghost"
            onClick={toggleAutoplay}
            _hover={{ transform: "scale(1.05)" }}
          >
            {autoplayRunning ? <LuPause /> : <LuPlay />}
          </IconButton>
        </Box>

        <Carousel.Navs
          leftIcon={<LuArrowLeft />}
          rightIcon={<LuArrowRight />}
        />
        <Carousel.Indicators count={items.length} />
      </Carousel.Root>
    </VStack>
  )
}

export default CarouselBasicExplorer
