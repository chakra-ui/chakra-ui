import { BoxProps } from "../Box";
import { RefAttributes, ForwardRefExoticComponent } from "react";

export type FixedProps = BoxProps & RefAttributes<HTMLDivElement>

declare const Fixed: ForwardRefExoticComponent<FixedProps>;

export default Fixed;