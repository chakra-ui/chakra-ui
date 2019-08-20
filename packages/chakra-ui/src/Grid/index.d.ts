import { BoxProps } from "../Box";
import * as React from "react";
import * as StyledSystem from "styled-system";

export type GridProps = BoxProps &
  StyledSystem.GridProps &
  React.RefAttributes<HTMLDivElement>;

declare const Grid: React.ForwardRefExoticComponent<GridProps>;

export default Grid;
