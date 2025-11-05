import { Carousel, IconButton } from "@chakra-ui/react"
import { DecorativeBox } from "compositions/lib/decorative-box"
import { LuArrowLeft, LuArrowRight } from "react-icons/lu"

const items = Array.from({ length: 5 })

export const CarouselWithProgressText = () => {
  return (
    <Carousel.Root slideCount={items.length} slidesPerPage={1.6} spacing="32px">
      <Carousel.ItemGroup scrollMarginInline="12">
        {items.map((_, index) => (
          <Carousel.Item key={index} index={index}>
            <DecorativeBox w="100%" h="300px" rounded="lg" fontSize="2.5rem">
              {index + 1}
            </DecorativeBox>
          </Carousel.Item>
        ))}
      </Carousel.ItemGroup>

      <Carousel.Control gap="4">
        <Carousel.PrevTrigger asChild>
          <IconButton size="xs" variant="ghost">
            <LuArrowLeft />
          </IconButton>
        </Carousel.PrevTrigger>
        <Carousel.ProgressText />
        <Carousel.NextTrigger asChild>
          <IconButton size="xs" variant="ghost">
            <LuArrowRight />
          </IconButton>
        </Carousel.NextTrigger>
      </Carousel.Control>
    </Carousel.Root>
  )
}
