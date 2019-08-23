import * as React from "react";
import * as StyledSystem from "styled-system";
import { BoxProps } from "../Box";

interface IGrid {
  templateColumns: StyledSystem.GridTemplateColumnsProps;
  gap: StyledSystem.GridGapProps;
  rowGap: StyledSystem.GridRowProps;
  columnGap: StyledSystem.GridColumnProps;
  autoFlow: StyledSystem.GridAutoFlowProps;
  autoRows: StyledSystem.GridAutoRowsProps;
  autoColumns: StyledSystem.GridAutoColumnsProps;
  templateRows: StyledSystem.GridTemplateRowsProps;
  templateAreas: StyledSystem.GridTemplateAreasProps;
  area: StyledSystem.GridAreaProps;
  column: StyledSystem.GridColumnProps;
  row: StyledSystem.GridRowProps;
}

export type GridProps = BoxProps & IGrid & React.RefAttributes<HTMLDivElement>;

declare const Grid: React.FC<GridProps>;

export default Grid;
