import * as React from "react";
import { chakra, PropsOf } from "@chakra-ui/system";

type Props = PropsOf<typeof chakra.div> & { axis?: "x" | "y" | "both" };

function AbsoluteCenter({ axis = "both", ...props }: Props) {
  const center = {
    x: { left: "50%", transform: `translateX(-50%)` },
    y: { top: "50%", transform: `translateY(-50%)` },
    both: { left: "50%", top: "50%", transform: `translate(-50%, -50%)` },
  };

  return <chakra.div position="absolute" {...center[axis]} {...props} />;
}

function FlexCenter({ axis = "both", ...props }: Props) {
  const center = {
    x: { justifyContent: "center" },
    y: { alignItems: "center" },
    both: { justifyContent: "center", alignItems: "center" },
  };
  return <chakra.div display="flex" {...center[axis]} {...props} />;
}

function Center(props: Props & { technique?: "absolute" | "flex" }) {
  const { technique, ...rest } = props;
  if (technique === "absolute") {
    return <AbsoluteCenter {...rest} />;
  }
  return <FlexCenter {...rest} />;
}

export default Center;
