import { Image } from "../../.."
import {
  CarouselControl,
  CarouselIndicator,
  CarouselIndicatorGroup,
  CarouselItem,
  CarouselItemGroup,
  CarouselNextTrigger,
  CarouselPrevTrigger,
  CarouselRoot,
} from "../carousel"

const items = [
  "https://picsum.photos/400/300?random=1",
  "https://picsum.photos/400/300?random=2",
  "https://picsum.photos/400/300?random=3",
  "https://picsum.photos/400/300?random=4",
  "https://picsum.photos/400/300?random=5",
]

export const CarouselBasic = () => {
  return (
    <CarouselRoot slideCount={items.length} maxW="400px" mx="auto">
      <CarouselItemGroup>
        {items.map((src, index) => (
          <CarouselItem key={index} index={index}>
            <Image
              src={src}
              alt={`Slide ${index + 1}`}
              w="100%"
              h="300px"
              objectFit="cover"
              borderRadius="md"
            />
          </CarouselItem>
        ))}
      </CarouselItemGroup>

      <CarouselControl>
        <CarouselPrevTrigger />
        <CarouselNextTrigger />
      </CarouselControl>

      <CarouselIndicatorGroup>
        {items.map((_, index) => (
          <CarouselIndicator
            key={index}
            index={index}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </CarouselIndicatorGroup>
    </CarouselRoot>
  )
}

export default CarouselBasic
