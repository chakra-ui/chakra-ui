import { ForwardRefExoticComponent, RefAttributes } from "react";
import { BoxProps } from "../Box";

type CenterProps = BoxProps & RefAttributes<HTMLDivElement>;

declare const Center: ForwardRefExoticComponent<CenterProps>;

export default Center;
