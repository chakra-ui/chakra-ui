import { BoxProps } from "../Box";
import * as React from "react";

export type GridProps = BoxProps & React.RefAttributes<HTMLDivElement>;

declare const Grid: React.ForwardRefExoticComponent<GridProps>;

export default Grid;
