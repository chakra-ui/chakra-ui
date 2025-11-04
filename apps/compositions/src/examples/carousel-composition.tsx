import { Carousel, IconButton } from "@chakra-ui/react"
import { DecorativeBox } from "compositions/lib/decorative-box"
import { LuChevronLeft, LuChevronRight } from "react-icons/lu"

const items = Array.from({ length: 5 })

export const CarouselComposition = () => {
  return (
    <Carousel.Root slideCount={items.length} maxW="2xl" mx="auto">
      <Carousel.Control justifyContent="flex-end" gap="2">
        <Carousel.PrevTrigger asChild>
          <IconButton size="xs" variant="ghost">
            <LuChevronLeft />
          </IconButton>
        </Carousel.PrevTrigger>

        <Carousel.NextTrigger asChild>
          <IconButton size="xs" variant="ghost">
            <LuChevronRight />
          </IconButton>
        </Carousel.NextTrigger>
      </Carousel.Control>
      <Carousel.ItemGroup>
        {items.map((_, index) => (
          <Carousel.Item key={index} index={index}>
            <DecorativeBox w="100%" h="300px" rounded="lg" fontSize="2.5rem">
              {index + 1}
            </DecorativeBox>
          </Carousel.Item>
        ))}
      </Carousel.ItemGroup>
      <Carousel.Indicators />
    </Carousel.Root>
  )
}
