import { Carousel, HStack, IconButton } from "@chakra-ui/react"
import { DecorativeBox } from "compositions/lib/decorative-box"
import {
  LuChevronLeft,
  LuChevronRight,
  LuClock,
  LuPause,
  LuPlay,
} from "react-icons/lu"

const items = Array.from({ length: 5 })

export const CarouselWithAutoplay = () => {
  return (
    <Carousel.Root
      autoplay={{ delay: 2000 }}
      slideCount={items.length}
      mx="auto"
      maxW="xl"
    >
      <HStack textStyle="sm" mb="4">
        <LuClock /> {"autoplay={{ delay: 2000 }}"} or {"autoplay={true}"}
      </HStack>
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

        <Carousel.AutoplayTrigger asChild>
          <IconButton aria-label="Toggle autoplay" size="sm" variant="ghost">
            <Carousel.AutoplayIndicator
              paused={<LuPause />}
              play={<LuPlay />}
            />
          </IconButton>
        </Carousel.AutoplayTrigger>
        <Carousel.NextTrigger asChild>
          <IconButton size="xs" variant="ghost">
            <LuChevronRight />
          </IconButton>
        </Carousel.NextTrigger>
      </Carousel.Control>
    </Carousel.Root>
  )
}
