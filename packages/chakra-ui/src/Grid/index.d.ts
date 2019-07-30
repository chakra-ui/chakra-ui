import { BoxProps } from "../Box";
import { RefAttributes, ForwardRefExoticComponent } from "react";

export type GridProps = BoxProps & RefAttributes<HTMLDivElement>

declare const Grid: ForwardRefExoticComponent<GridProps>;

export default Grid;