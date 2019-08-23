import { BoxProps } from "../Box";
import * as React from "react";

export type FixedProps = BoxProps & React.RefAttributes<HTMLDivElement>;

declare const Fixed: React.FC<FixedProps>;

export default Fixed;
