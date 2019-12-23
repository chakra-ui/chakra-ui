import { chakra, ChakraComponent, forwardRef } from "@chakra-ui/system";
import * as React from "react";
import { BoxProps } from "../Box";

const visuallyHiddenStyles: React.CSSProperties = {
  border: "0px",
  clip: "rect(0px, 0px, 0px, 0px)",
  height: "1px",
  width: "1px",
  margin: "-1px",
  padding: "0px",
  overflow: "hidden",
  whiteSpace: "nowrap",
  position: "absolute",
};

const VisuallyHidden = forwardRef((props: BoxProps, ref: React.Ref<any>) => (
  <chakra.div ref={ref} style={visuallyHiddenStyles} {...props} />
)) as ChakraComponent<"div">;

export default VisuallyHidden;
