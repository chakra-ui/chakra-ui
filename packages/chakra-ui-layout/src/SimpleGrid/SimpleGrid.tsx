import React, { forwardRef } from "react";
import { countToColumns, widthToColumns } from "./utils";
import { SystemProps, BoxProps } from "../Box";
import { ResponsiveValue } from "styled-system";
import { Grid } from "../Grid";

interface SimpleGridOptions {
  /**
   * The width at which child elements will break into columns. Pass a number for pixel values or a string for any other valid CSS length.
   */
  minChildWidth?: SystemProps["minWidth"];
  /**
   * The number of columns
   */
  columns?: ResponsiveValue<number>;
  /**
   * The gap between the grid items
   */
  spacing?: SystemProps["gridGap"];
  /**
   * The column gap between the grid items
   */
  spacingX?: SystemProps["gridGap"];
  /**
   * The row gap between the grid items
   */
  spacingY?: SystemProps["gridGap"];
}

type SimpleGridProps<P, T> = BoxProps<P, T> & SimpleGridOptions;

const SimpleGrid = forwardRef(function SimpleGrid<P, T extends HTMLElement>(
  {
    columns,
    spacingX,
    spacingY,
    spacing,
    minChildWidth,
    ...props
  }: SimpleGridProps<P, T>,
  ref: React.Ref<T>,
) {
  const templateColumns = !!minChildWidth
    ? widthToColumns(minChildWidth)
    : countToColumns(columns);

  return (
    <Grid
      ref={ref}
      gap={spacing}
      columnGap={spacingX}
      rowGap={spacingY}
      templateColumns={templateColumns}
      {...props}
    />
  );
});

export default SimpleGrid;
