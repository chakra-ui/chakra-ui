"use client"

import { Carousel, Image } from "@chakra-ui/react"
import { LuArrowDown, LuArrowUp } from "react-icons/lu"

const items = Array.from(
  { length: 5 },
  (_, i) => `https://picsum.photos/seed/vertical-${i + 1}/400/300`,
)

export const CarouselWithOrientation = () => {
  return (
    <Carousel.Root
      orientation="vertical"
      slideCount={items.length}
      maxW="400px"
      mx="auto"
    >
      <Carousel.ItemGroup h="350px">
        {items.map((src, index) => (
          <Carousel.Item key={index} index={index}>
            <Image
              src={src}
              alt={`Slide ${index + 1}`}
              w="100%"
              h="full"
              objectFit="cover"
              borderRadius="md"
            />
          </Carousel.Item>
        ))}
      </Carousel.ItemGroup>
      <Carousel.Navs leftIcon={<LuArrowUp />} rightIcon={<LuArrowDown />} />
      <Carousel.Indicators mt={4} count={items.length} />
    </Carousel.Root>
  )
}

export default CarouselWithOrientation
