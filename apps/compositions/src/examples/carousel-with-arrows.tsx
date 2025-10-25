"use client"

import { Carousel, Image } from "@chakra-ui/react"
import { LuArrowLeft, LuArrowRight } from "react-icons/lu"

const items = Array.from(
  { length: 5 },
  (_, i) => `https://picsum.photos/seed/${i + 1}/500/300`,
)

export const CarouselWithArrows = () => {
  return (
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
      <Carousel.Navs leftIcon={<LuArrowLeft />} rightIcon={<LuArrowRight />} />
    </Carousel.Root>
  )
}

export default CarouselWithArrows
