import * as React from "react";
import * as StyledSystem from "styled-system";
import { BoxProps } from "../Box";

interface IGrid {
  templateColumns?: StyledSystem.GridTemplateColumnsProps["gridTemplateColumns"];
  gap?: StyledSystem.GridGapProps["gridGap"];
  rowGap?: StyledSystem.GridRowGapProps["gridRowGap"];
  columnGap?: StyledSystem.GridColumnGapProps["gridColumnGap"];
  autoFlow?: StyledSystem.GridAutoFlowProps["gridAutoFlow"];
  autoRows?: StyledSystem.GridAutoRowsProps["gridAutoRows"];
  autoColumns?: StyledSystem.GridAutoColumnsProps["gridAutoColumns"];
  templateRows?: StyledSystem.GridTemplateRowsProps["gridTemplateRows"];
  templateAreas?: StyledSystem.GridTemplateAreasProps["gridTemplateAreas"];
  area?: StyledSystem.GridAreaProps["gridArea"];
  column?: StyledSystem.GridColumnProps["gridColumn"];
  row?: StyledSystem.GridRowProps["gridRow"];
}

export type GridProps = BoxProps & IGrid & React.RefAttributes<HTMLElement>;

declare const Grid: React.FC<GridProps>;

export default Grid;
