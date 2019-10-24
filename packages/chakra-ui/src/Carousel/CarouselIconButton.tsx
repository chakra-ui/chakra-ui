import { IconButton, IconButtonProps } from "@chakra-ui/core";
import React from "react";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface CarouselIconButtonProps extends IconButtonProps {}

export default function CarouselIconButton(props: CarouselIconButtonProps) {
  return (
    <IconButton
      variantColor="blackAlpha"
      color="white"
      size="lg"
      fontSize="3xl"
      isRound
      {...props}
    />
  );
}
