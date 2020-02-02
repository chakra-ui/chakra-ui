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

const BaseAddon = createChakra("div", { themeKey: "Input" });

type InputAddonProps = PropsOf<typeof BaseAddon> & { placement?: Placement };

export function InputAddon({ placement = "left", ...props }: InputAddonProps) {
  const bg = useColorModeValue(`whiteAlpha.300`, `gray.100`);

  const placementStyles = getPlacementStyles(placement);

  return (
    <BaseAddon
      flex="0 0 auto"
      whiteSpace="nowrap"
      bg={bg}
      {...placementStyles}
      {...props}
    />
  );
}

InputAddon.displayName = "InputAddon";

InputAddon.defaultProps = {
  placement: "left",
  variantSize: "md",
};

const InputLeftAddon = (props: InputAddonProps) => (
  <InputAddon placement="left" {...props} />
);

InputLeftAddon.displayName = "InputLeftAddon";

const InputRightAddon = (props: InputAddonProps) => (
  <InputAddon placement="right" {...props} />
);

InputRightAddon.displayName = "InputRightAddon";

export { InputLeftAddon, InputRightAddon };
export default InputAddon;
