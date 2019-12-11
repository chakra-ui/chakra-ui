import * as React from "react";
import { BoxProps } from "../Box";
import { Omit } from "../common-types";

declare const Divider: React.FC<
  Omit<BoxProps, "aria-orientation"> & {
    orientation?: BoxProps["aria-orientation"];
  }
>;
export default Divider;
