import * as React from "react";
import { chakra, PropsOf } from "@chakra-ui/system";

export function Spacer(props: PropsOf<typeof chakra.div>) {
  return (
    <chakra.div flex="1" justifySelf="stretch" alignSelf="stretch" {...props} />
  );
}

export default Spacer;
