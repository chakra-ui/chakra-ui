import { chakra, ChakraComponent, forwardRef } from "@chakra-ui/system";
import * as React from "react";
import { BoxProps } from "../Box";

export interface GridOptions {
  templateColumns?: BoxProps["gridTemplateColumns"];
  gap?: BoxProps["gridGap"];
  rowGap?: BoxProps["gridRowGap"];
  columnGap?: BoxProps["gridColumnGap"];
  autoFlow?: BoxProps["gridAutoFlow"];
  autoRows?: BoxProps["gridAutoRows"];
  autoColumns?: BoxProps["gridAutoColumns"];
  templateRows?: BoxProps["gridTemplateRows"];
  templateAreas?: BoxProps["gridTemplateAreas"];
  area?: BoxProps["gridArea"];
  column?: BoxProps["gridColumn"];
  row?: BoxProps["gridRow"];
}

export type GridProps = BoxProps & GridOptions;

const Grid = forwardRef(
  (
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
    }: GridProps,
    ref: React.Ref<any>,
  ) => {
    return (
      <chakra.div
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
  },
) as ChakraComponent<"div">;

export default Grid;
