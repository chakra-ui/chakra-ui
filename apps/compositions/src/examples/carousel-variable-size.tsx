import { Carousel, Center, IconButton } from "@chakra-ui/react"
import { LuChevronLeft, LuChevronRight } from "react-icons/lu"

const items = [
  { id: "1", width: "120px", label: "Small" },
  { id: "2", width: "200px", label: "Medium Size" },
  { id: "3", width: "80px", label: "XS" },
  { id: "4", width: "250px", label: "Large Content Here" },
  { id: "5", width: "150px", label: "Regular" },
]

export const CarouselVariableSize = () => {
  return (
    <Carousel.Root
      slideCount={items.length}
      autoSize
      spacing="8px"
      maxW="xl"
      mx="auto"
    >
      <Carousel.Control gap="4">
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
        {items.map((item, index) => (
          <Carousel.Item
            key={item.id}
            index={index}
            snapAlign="center"
            width="auto"
          >
            <Center
              style={{ width: item.width }}
              height="100px"
              bg="bg.emphasized"
              rounded="l2"
            >
              {item.label}
            </Center>
          </Carousel.Item>
        ))}
      </Carousel.ItemGroup>
    </Carousel.Root>
  )
}
