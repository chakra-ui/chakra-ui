"use client"

import { Carousel } from "@chakra-ui/react"
import { Box, IconButton, Image } from "@chakra-ui/react"
import * as React from "react"
import { LuPause, LuPlay } from "react-icons/lu"

interface CarouselRootProps extends Carousel.RootProps {
  withAutoplay?: boolean
}

export const CarouselRoot = React.forwardRef<HTMLDivElement, CarouselRootProps>(
  function CarouselRoot(props, ref) {
    const { children, withAutoplay, ...rest } = props
    return (
      <Carousel.Root {...rest} ref={ref}>
        {children}
        {withAutoplay && (
          <Box
            position="absolute"
            bottom="var(--carousel-spacing)"
            right="var(--carousel-spacing)"
          >
            <Carousel.AutoplayTrigger asChild>
              <IconButton
                aria-label="Toggle autoplay"
                size="sm"
                variant="ghost"
              >
                <AutoplayIcon />
              </IconButton>
            </Carousel.AutoplayTrigger>
          </Box>
        )}
      </Carousel.Root>
    )
  },
)

export const CarouselControls = React.forwardRef<
  HTMLDivElement,
  Carousel.ControlProps
>(function CarouselControls(props, ref) {
  return (
    <Carousel.Control ref={ref} {...props}>
      <Carousel.PrevTrigger aria-label="Previous" />
      <Carousel.NextTrigger aria-label="Next" />
    </Carousel.Control>
  )
})

export const CarouselIndicators = React.forwardRef<
  HTMLDivElement,
  Carousel.IndicatorGroupProps
>(function CarouselIndicators(props, ref) {
  return <Carousel.IndicatorGroup ref={ref} {...props} />
})

export const CarouselItem = React.forwardRef<
  HTMLDivElement,
  Carousel.ItemProps & { src?: string; alt?: string }
>(function CarouselItem({ src, alt, children, ...rest }, ref) {
  return (
    <Carousel.Item {...rest} ref={ref}>
      {src ? (
        <Image
          src={src}
          alt={alt}
          w="full"
          h="300px"
          objectFit="cover"
          borderRadius="md"
        />
      ) : (
        children
      )}
    </Carousel.Item>
  )
})

const AutoplayIcon = () => {
  const [running, setRunning] = React.useState(true)
  const toggle = () => setRunning(!running)
  return <Box onClick={toggle}>{running ? <LuPause /> : <LuPlay />}</Box>
}

export const CarouselItemGroup = Carousel.ItemGroup
export const CarouselIndicator = Carousel.Indicator
export const CarouselPrevTrigger = Carousel.PrevTrigger
export const CarouselNextTrigger = Carousel.NextTrigger
export const CarouselAutoplayTrigger = Carousel.AutoplayTrigger
