import React, { forwardRef } from "react";
import { Box, BoxProps, SystemProps } from "@chakra-ui/layout";

export interface GridOptions {
  templateColumns?: SystemProps["gridTemplateColumns"];
  gap?: SystemProps["gridGap"];
  rowGap?: SystemProps["gridRowGap"];
  columnGap?: SystemProps["gridColumnGap"];
  autoFlow?: SystemProps["gridAutoFlow"];
  autoRows?: SystemProps["gridAutoRows"];
  autoColumns?: SystemProps["gridAutoColumns"];
  templateRows?: SystemProps["gridTemplateRows"];
  templateAreas?: SystemProps["gridTemplateAreas"];
  area?: SystemProps["gridArea"];
  column?: SystemProps["gridColumn"];
  row?: SystemProps["gridRow"];
}

export type GridProps<P, T> = BoxProps<P, T> & GridOptions;

const Grid = forwardRef(function Grid<P, T extends HTMLElement>(
  {
    gap,
    rowGap,
    columnGap,
    autoFlow,
    autoRows,
    autoColumns,
    templateRows,
    templateColumns,
    templateAreas,
    area,
    column,
    row,
    ...props
  }: GridProps<P, T>,
  ref: React.Ref<T>,
) {
  return (
    <Box
      ref={ref}
      display="grid"
      gridArea={area}
      gridTemplateAreas={templateAreas}
      gridGap={gap}
      gridRowGap={rowGap}
      gridColumnGap={columnGap}
      gridAutoColumns={autoColumns}
      gridColumn={column}
      gridRow={row}
      gridAutoFlow={autoFlow}
      gridAutoRows={autoRows}
      gridTemplateRows={templateRows}
      gridTemplateColumns={templateColumns}
      {...props}
    />
  );
}) as <P = {}, T = HTMLElement>(
  props: GridProps<P, T>,
) => React.ReactElement<GridProps<P, T>>;

export default Grid;
