import { BoxProps } from "../Box";
import { ForwardRefExoticComponent, RefAttributes } from "react";

export type AbsoluteProps = BoxProps & RefAttributes<HTMLDivElement>

declare const Absolute: ForwardRefExoticComponent<AbsoluteProps>;

export default Absolute;