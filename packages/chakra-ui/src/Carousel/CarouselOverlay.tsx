import { Box, BoxProps } from "../Box";
import React from "react";
import CarouselPlayToggleIconButton from "./CarouselPlayToggleIconButton";
import CarouselStepIconButton from "./CarouselStepIconButton";

export interface CarouselOverlayProps extends BoxProps {
  children?: React.ReactElement | React.ReactElement[];
}

export default function CarouselOverlay({
  children = [
    <CarouselPlayToggleIconButton
      top={4}
      left="50%"
      transform="translateX(-50%)"
    />,
    <CarouselStepIconButton
      delta={-1}
      aria-label="Previous slide"
      icon="chevron-left"
      top="50%"
      left={4}
      transform="translateY(-50%)"
    />,
    <CarouselStepIconButton
      delta={+1}
      aria-label="Next slide"
      icon="chevron-right"
      top="50%"
      right={4}
      transform="translateY(-50%)"
    />,
  ],
  ...restProps
}: CarouselOverlayProps) {
  return (
    <Box {...restProps}>
      {React.Children.map(children, child =>
        React.cloneElement(child, {
          css: {
            position: "absolute",
            zIndex: 1,
          },
        }),
      )}
    </Box>
  );
}
