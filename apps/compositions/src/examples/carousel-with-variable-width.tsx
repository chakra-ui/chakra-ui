"use client"

import { Box, Carousel } from "@chakra-ui/react"
import { LuArrowLeft, LuArrowRight } from "react-icons/lu"

const items = [
  { width: "20%", label: "Small", color: "bg.subtle" },
  { width: "30%", label: "Medium", color: "bg.muted" },
  { width: "50%", label: "Large", color: "bg.subtle" },
  { width: "20%", label: "Small", color: "bg.muted" },
  { width: "30%", label: "Medium", color: "bg.subtle" },
  { width: "50%", label: "Large", color: "bg.muted" },
]

export const CarouselWithVariableWidth = () => {
  const slidesPerPage = 3
  const slidesPerMove = 3
  const totalPages = Math.ceil(items.length / slidesPerMove)

  return (
    <Carousel.Root
      slideCount={items.length}
      slidesPerPage={slidesPerPage}
      slidesPerMove={slidesPerMove}
      spacing="20px"
      maxW="900px"
      mx="auto"
    >
      <Carousel.ItemGroup
        display="grid"
        gridAutoFlow="column"
        gridAutoColumns="auto"
      >
        {items.map((item, index) => (
          <Carousel.Item key={index} index={index} asChild>
            <Box
              w="full"
              maxW={item.width}
              minW="full"
              h="200px"
              borderRadius="md"
              bg={item.color}
              color="fg"
              display="flex"
              alignItems="center"
              justifyContent="center"
              borderWidth="1px"
              borderColor="border"
              fontWeight="medium"
            >
              {item.label}
            </Box>
          </Carousel.Item>
        ))}
      </Carousel.ItemGroup>
      <Carousel.Navs leftIcon={<LuArrowLeft />} rightIcon={<LuArrowRight />} />
      <Carousel.Indicators mt={6} count={totalPages} />
    </Carousel.Root>
  )
}

export default CarouselWithVariableWidth
