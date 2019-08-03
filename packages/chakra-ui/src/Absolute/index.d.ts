import { BoxProps } from "../Box";
import * as React from "react";

export type AbsoluteProps = BoxProps & React.RefAttributes<HTMLDivElement>;

declare const Absolute: React.ForwardRefExoticComponent<AbsoluteProps>;

export default Absolute;
