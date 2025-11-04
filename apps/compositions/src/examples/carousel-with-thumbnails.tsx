import {
  AspectRatio,
  Carousel,
  HStack,
  IconButton,
  Image,
} from "@chakra-ui/react"
import { useCarouselContext } from "@chakra-ui/react"
import { LuChevronLeft, LuChevronRight } from "react-icons/lu"

export const CarouselWithThumbnails = () => {
  return (
    <Carousel.Root slideCount={items.length}>
      <Carousel.Control justifyContent="center" gap="4" width="full">
        <Carousel.PrevTrigger asChild>
          <IconButton size="xs" variant="outline">
            <LuChevronLeft />
          </IconButton>
        </Carousel.PrevTrigger>
        <Carousel.ItemGroup width="full">
          {items.map((item, index) => (
            <Carousel.Item key={index} index={index}>
              <AspectRatio ratio={16 / 9}>
                <Image
                  src={item.url}
                  alt={item.label}
                  w="100%"
                  h="100%"
                  objectFit="cover"
                />
              </AspectRatio>
            </Carousel.Item>
          ))}
        </Carousel.ItemGroup>
        <Carousel.NextTrigger asChild>
          <IconButton size="xs" variant="outline">
            <LuChevronRight />
          </IconButton>
        </Carousel.NextTrigger>
      </Carousel.Control>

      <CarouselThumbnails items={items} />
    </Carousel.Root>
  )
}

const CarouselThumbnails = ({
  items,
}: {
  items: { label: string; url: string }[]
}) => {
  const carousel = useCarouselContext()

  return (
    <HStack justify="center" mt={2} gap={2}>
      {items.map((item, index) => (
        <AspectRatio
          key={index}
          ratio={16 / 9}
          w="20"
          cursor="button"
          onClick={() => carousel.scrollTo(index)}
        >
          <Image
            src={item.url}
            alt={item.label}
            w="100%"
            h="100%"
            objectFit="cover"
          />
        </AspectRatio>
      ))}
    </HStack>
  )
}

const items = [
  {
    label: "Mountain Landscape",
    url: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&h=900&q=80",
  },
  {
    label: "Forest Path",
    url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&h=900&q=80",
  },
  {
    label: "Ocean Waves",
    url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&h=900&q=80",
  },
  {
    label: "Desert Dunes",
    url: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&h=900&q=80",
  },
  {
    label: "Sunset Lake",
    url: "https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?auto=format&fit=crop&q=80&w=2070",
  },
]
