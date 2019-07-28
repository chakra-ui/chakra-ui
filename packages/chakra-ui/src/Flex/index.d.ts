import { BoxProps } from "../Box";
import { RefAttributes, ForwardRefExoticComponent } from "react";

export type FlexProps = BoxPropss & RefAttributes<HTMLDivElement>

declare const Flex: ForwardRefExoticComponent<FlexProps>;

export default Flex;