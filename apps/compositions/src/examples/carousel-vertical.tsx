import { Carousel, IconButton } from "@chakra-ui/react"
import { DecorativeBox } from "compositions/lib/decorative-box"
import { LuChevronDown, LuChevronUp } from "react-icons/lu"

const items = Array.from({ length: 5 })

export const CarouselVertical = () => {
  return (
    <Carousel.Root
      orientation="vertical"
      slideCount={items.length}
      mx="auto"
      height="320px"
      maxW="xl"
    >
      <Carousel.ItemGroup flex="1">
        {items.map((_, index) => (
          <Carousel.Item key={index} index={index}>
            <DecorativeBox fontSize="2.5rem">{index + 1}</DecorativeBox>
          </Carousel.Item>
        ))}
      </Carousel.ItemGroup>
      <Carousel.Control h="100%" justifyContent="space-between" gap="4">
        <Carousel.PrevTrigger asChild>
          <IconButton size="xs" variant="ghost">
            <LuChevronUp />
          </IconButton>
        </Carousel.PrevTrigger>

        <Carousel.Indicators />

        <Carousel.NextTrigger asChild>
          <IconButton size="xs" variant="ghost">
            <LuChevronDown />
          </IconButton>
        </Carousel.NextTrigger>
      </Carousel.Control>
    </Carousel.Root>
  )
}
