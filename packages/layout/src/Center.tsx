import * as React from "react";
import { chakra, PropsOf } from "@chakra-ui/system";

type Props = PropsOf<typeof chakra.div>;

export function AbsoluteCenter(props: Props) {
  return (
    <chakra.div
      position="absolute"
      left="50%"
      top="50%"
      transform="translate(-50%, -50%)"
      {...props}
    />
  );
}

export function FlexCenter(props: Props) {
  return (
    <chakra.div
      display="flex"
      alignItems="center"
      justifyContent="center"
      {...props}
    />
  );
}
