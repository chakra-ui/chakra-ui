import { createChakra, PropsOf, useColorModeValue } from "@chakra-ui/system";
import * as React from "react";

type Placement = "left" | "right";

function getPlacementStyles(placement: Placement) {
  if (placement === "left") {
    return {
      marginRight: "-1px",
      roundedRight: 0,
      borderRightColor: "transparent",
    };
  }

  if (placement === "right") {
    return {
      order: 1,
      roundedLeft: 0,
      borderLeftColor: "transparent",
    };
  }

  return {};
}

const StyledAddon = createChakra("div", { themeKey: "Input" });

type InputAddonProps = PropsOf<typeof StyledAddon> & { placement?: Placement };

export function InputAddon({
  placement = "left",
  variantSize = "md",
  ...props
}: InputAddonProps) {
  const bg = useColorModeValue(`whiteAlpha.300`, `gray.100`);
  const placementStyles = getPlacementStyles(placement);

  return (
    <StyledAddon
      flex="0 0 auto"
      whiteSpace="nowrap"
      bg={bg}
      variantSize={variantSize}
      {...placementStyles}
      {...props}
    />
  );
}
InputAddon.displayName = "InputAddon";

export const InputLeftAddon = (props: InputAddonProps) => (
  <InputAddon placement="left" {...props} />
);
InputLeftAddon.displayName = "InputLeftAddon";

export const InputRightAddon = (props: InputAddonProps) => (
  <InputAddon placement="right" {...props} />
);
InputRightAddon.displayName = "InputRightAddon";
