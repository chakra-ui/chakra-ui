import * as React from "react";
import { BoxProps } from "../Box";

export type CenterProps = BoxProps & React.RefAttributes<HTMLDivElement>;

declare const Center: React.ForwardRefExoticComponent<CenterProps>;

export default Center;
