"use client"

import { Button, Carousel, IconButton, useCarousel } from "@chakra-ui/react"
import { DecorativeBox } from "compositions/lib/decorative-box"
import { LuChevronLeft, LuChevronRight } from "react-icons/lu"

const items = Array.from({ length: 5 })

export const CarouselWithStore = () => {
  const carousel = useCarousel({ slideCount: items.length })

  return (
    <Carousel.RootProvider value={carousel} maxW="xl" mx="auto">
      <Button variant="outline" onClick={() => carousel.scrollTo(2)}>
        Go to slide 3
      </Button>
      <Carousel.ItemGroup>
        {items.map((_, index) => (
          <Carousel.Item key={index} index={index}>
            <DecorativeBox w="100%" h="300px" rounded="lg" fontSize="2.5rem">
              {index + 1}
            </DecorativeBox>
          </Carousel.Item>
        ))}
      </Carousel.ItemGroup>

      <Carousel.Control justifyContent="center" gap="4">
        <Carousel.PrevTrigger asChild>
          <IconButton size="xs" variant="ghost">
            <LuChevronLeft />
          </IconButton>
        </Carousel.PrevTrigger>

        <Carousel.Indicators />

        <Carousel.NextTrigger asChild>
          <IconButton size="xs" variant="ghost">
            <LuChevronRight />
          </IconButton>
        </Carousel.NextTrigger>
      </Carousel.Control>
    </Carousel.RootProvider>
  )
}
