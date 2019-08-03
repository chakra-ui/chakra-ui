import { BoxProps } from "../Box";
import * as React from "react";

export type FlexProps = BoxProps & React.RefAttributes<HTMLDivElement>;

declare const Flex: React.ForwardRefExoticComponent<FlexProps>;

export default Flex;
