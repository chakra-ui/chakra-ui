import { Carousel, IconButton } from "@chakra-ui/react"
import { DecorativeBox } from "compositions/lib/decorative-box"
import { LuChevronLeft, LuChevronRight, LuPause, LuPlay } from "react-icons/lu"

const items = Array.from({ length: 5 })

export const CarouselBasicExplorer = () => {
  return (
    <Carousel.Root slideCount={items.length} spacing="20px" flexGrow="1">
      <Carousel.ItemGroup p="2">
        {items.map((_, index) => (
          <Carousel.Item key={index} index={index}>
            <DecorativeBox w="100%" h="300px" rounded="lg" fontSize="2.5rem">
              {index + 1}
            </DecorativeBox>
          </Carousel.Item>
        ))}
      </Carousel.ItemGroup>

      <Carousel.Control justifyContent="center" gap="4">
        <Carousel.ProgressText textStyle="sm" minW="8" />

        <Carousel.PrevTrigger asChild>
          <IconButton size="xs" variant="ghost">
            <LuChevronLeft />
          </IconButton>
        </Carousel.PrevTrigger>

        <Carousel.AutoplayTrigger asChild>
          <IconButton size="sm" variant="ghost" aria-label="Toggle autoplay">
            <Carousel.AutoplayIndicator
              paused={<LuPause />}
              play={<LuPlay />}
            />
          </IconButton>
        </Carousel.AutoplayTrigger>

        <Carousel.Indicators />

        <Carousel.NextTrigger asChild>
          <IconButton size="xs" variant="ghost">
            <LuChevronRight />
          </IconButton>
        </Carousel.NextTrigger>
      </Carousel.Control>
    </Carousel.Root>
  )
}
